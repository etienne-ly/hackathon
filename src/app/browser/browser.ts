import {Component, ComponentRef, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Tab} from '../models/state';
import {Binocular} from '../binocular/binocular';
import {DormComponent} from '../dorm/dorm';
import {MailComponent} from '../mail-page/mail-page.component';
import {GameService} from '../service/game.service';

@Component({
  selector: 'app-browser',
  imports: [
    FormsModule,
  ],
  templateUrl: './browser.html',
  styleUrl: './browser.css',
})

export class Browser {

  constructor(public game: GameService) {}

  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  currentTab: number = -1;
  query: string = "";
  tabs: Tab[] = [];

  openDorm(): void {
    this.openTab("Dorm", "127.0.0.1", DormComponent)
  }

  openMail(): void {
    this.openTab("Mail", "https://insidemail.com", MailComponent)
  }

  openTab(title: string, url: string, component: Type<any> = Binocular): ComponentRef<any> {
    this.tabs.push({
      url,
      title,
      componentRef: this.container.createComponent(component),
    });

    if (this.currentTab !== -1) {
      const tab = this.tabs[this.currentTab];
      const idx = this.container.indexOf(tab.componentRef.hostView);
      this.container.detach(idx);
    }

    this.currentTab = this.tabs.length - 1;
    this.container.insert(this.tabs[this.currentTab].componentRef.hostView);
    this.query = url;
    return this.tabs[this.currentTab].componentRef;
  }

  closeTab(index: number) {
    if (this.tabs.length == 0 || index >= this.tabs.length) {
      return;
    }

    const deletedCurr = this.currentTab == index;
    const tab = this.tabs[index];
    const idx = this.container.indexOf(tab.componentRef.hostView);
    if (idx !== -1) {
      this.container.detach(idx);
    }

    tab.componentRef.destroy();
    this.tabs.splice(index, 1);

    if (this.tabs.length == 0) {
      this.currentTab = -1;
      return;
    }

    if (this.currentTab != 0 && index <= this.currentTab) {
      this.currentTab--;
    }

    if (deletedCurr) {
      const newTab = this.tabs[this.currentTab];
      this.container.insert(newTab.componentRef.hostView);
      this.query = newTab.url;
    }
  }

  selectTab(index: number) {
    if (this.tabs.length == 0 || index >= this.tabs.length) {
      return;
    }

    const newTab = this.tabs[index];
    if (!newTab) {
      return;
    }

    const tab = this.tabs[this.currentTab];
    const idx = this.container.indexOf(tab.componentRef.hostView);
    if (idx !== -1) {
      this.container.detach(idx);
    }

    this.container.insert(newTab.componentRef.hostView);
    this.currentTab = index;
    this.query = newTab.url;
  }

  replaceTab(title: string, url: string, component: Type<any>): ComponentRef<any> {
    if (this.currentTab == -1) {
      const ref = this.openTab(title, url, component);
      ref.setInput('replaceTab', (title: string, url: string, component: Type<any>) => this.replaceTab(title, url, component))
      return ref;
    }

    const tab = this.tabs[this.currentTab];
    const idx = this.container.indexOf(tab.componentRef.hostView);
    if (idx !== -1) {
      this.container.detach(idx);
    }

    tab.componentRef.destroy();
    this.tabs[this.currentTab] = {
      title,
      url,
      componentRef: this.container.createComponent(component)
    }

    this.query = url;
    this.container.insert(this.tabs[this.currentTab].componentRef.hostView)
    return this.tabs[this.currentTab].componentRef;
  }

  search(): void {
    // if (this.query.startsWith("http")) {
    //   // TODO: Go straight to website
    //   return;
    // }

    // go to search website
    const realQuery = this.query;
    if (this.currentTab == -1) {
      const ref = this.openTab("Binocular", "https://binocular.com", Binocular);
      ref.setInput("search", realQuery);
      ref.setInput('replaceTab', (title: string, url: string, component: Type<any>) => this.replaceTab(title, url, component))
      return;
    }

    // replace current tab with a search one
    const ref = this.replaceTab("Binocular", "https://binocular.com", Binocular);
    ref.setInput("search", realQuery);
    ref.setInput('replaceTab', (title: string, url: string, component: Type<any>) => this.replaceTab(title, url, component))
  }

}
