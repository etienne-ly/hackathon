import {Component, Input} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {GameService} from '../../service/game.service';
import {NewsTemplate} from '../templates/news-template/news-template';

@Component({
  selector: 'app-browser',
  imports: [
    NewsTemplate,
  ],
  templateUrl: './browser.html',
  styleUrl: './browser.css',
})

export class Browser {
  constructor(public gameService: GameService) {}
  currentTab: number = -1;
}
