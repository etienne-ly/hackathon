import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {GameService} from '../../service/game.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-browser',
  imports: [
    RouterOutlet,
    FormsModule,
  ],
  templateUrl: './browser.html',
  styleUrl: './browser.css',
})

export class Browser {

  currentTab: number = -1;
  query: string = "";

  constructor(public gameService: GameService, private router: Router) {
    if (this.currentTab < 0 || gameService.tabs.length === 0) {
      return;
    }

    this.query = gameService.tabs![this.currentTab].url;
  }

  search(): void {
    if (this.query.startsWith("http")) {
      // TODO: Go straight to website
      return;
    }

    // go to search website
    this.router.navigate(['/binocular'], {queryParams: {search: this.query}});
  }

}
