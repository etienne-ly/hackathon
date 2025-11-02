import {Component, Input} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {GameService} from '../../service/game.service';
import {NewsTemplate} from '../templates/news-template/news-template';
import {BusinessTemplate} from '../templates/business/business.template';
import {Tab} from '../../models/state';
import {ECommerceTemplate} from '../templates/e-commerce.template/e-commerce.template';

@Component({
  selector: 'app-browser',
  imports: [
    RouterLink,
    RouterOutlet,
    ECommerceTemplate
  ],
  templateUrl: './browser.html',
  styleUrl: './browser.css',
})

export class Browser {
  constructor(public gameService: GameService, private router:Router) {}
  currentTab: number = -1;
  mailTab = { icon: 'envelope', title: 'Mail', url: '/insideMail' };
  dormTab = { icon: 'bed', title: 'Dorm', url: '/dorm' };

  selectTab(tab: Tab) {
    const idx = this.gameService.tabs.indexOf(tab);
    if (idx < 0) return;
    this.currentTab = idx;
    const target = tab.url && tab.url.length ? tab.url : '/';
    this.router.navigateByUrl(target);
  }
  addTab(tab?: Tab): void {
    const newTab: Tab = tab ?? { title: 'Untitled', url: '/' };
    this.gameService.tabs.push(newTab);
    this.selectTab(newTab);
  }

  updateTabUrl(tab: Tab, url: string) {
    const idx = this.gameService.tabs.indexOf(tab);
    if (idx < 0) return;
    this.gameService.tabs[idx].url = url;
  }

  closeTab(tab: Tab, event: Event) {
    event.stopPropagation();
    const idx = this.gameService.tabs.indexOf(tab);
    if (idx < 0) return;

    this.gameService.tabs.splice(idx, 1);

    if (this.currentTab === idx) {
      // pick adjacent tab, prefer same index (which now points to next tab),
      // fall back to previous tab, otherwise navigate home
      const newIndex = Math.min(idx, this.gameService.tabs.length - 1);
      if (newIndex >= 0) {
        this.currentTab = newIndex;
        const next = this.gameService.tabs[newIndex];
        this.router.navigateByUrl(next.url && next.url.length ? next.url : '/');
      } else {
        this.currentTab = -1;
        this.router.navigateByUrl('/');
      }
    } else if (this.currentTab > idx) {
      // shift current index down because array shrank
      this.currentTab--;
    }
  }
}



