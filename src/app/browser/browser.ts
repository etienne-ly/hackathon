import {Component, ComponentRef, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Tab} from '../models/state';
import {Binocular} from '../binocular/binocular';
import {DormComponent} from '../dorm/dorm';
import {BusinessTemplate} from '../templates/business/business.template';
import {NewsTemplate} from '../templates/news-template/news-template';

@Component({
  selector: 'app-browser',
  imports: [
    FormsModule,
    BusinessTemplate,
    NewsTemplate
  ],
  templateUrl: './browser.html',
  styleUrl: './browser.css',
})

export class Browser {

  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  currentTab: number = -1;
  query: string = "";
  tabs: Tab[] = [];

  openDorm(): void {
    this.openTab("Dorm", "127.0.0.1", DormComponent)
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
  }

  replaceTab(title: string, url: string, component: Type<any>): ComponentRef<any> {
    if (this.currentTab == -1) {
      return this.openTab(title, url, component);
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

    this.container.insert(this.tabs[this.currentTab].componentRef.hostView)
    return this.tabs[this.currentTab].componentRef;
  }

  search(): void {
    // if (this.query.startsWith("http")) {
    //   // TODO: Go straight to website
    //   return;
    // }

    // go to search website
    if (this.currentTab == -1) {
      const ref = this.openTab("Binocular", "https://binocular.com", Binocular);
      ref.setInput("search", this.query);
      return;
    }

    // replace current tab with a search one
    const ref = this.replaceTab("Binocular", "https://binocular.com", Binocular);
    ref.setInput("search", this.query);
  }

}
