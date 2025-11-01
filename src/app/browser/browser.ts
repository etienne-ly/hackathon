import {Component, Input} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Tab} from '../../models/state';
import {GameService} from '../../service/game.service';

@Component({
  selector: 'app-browser',
  imports: [
    RouterOutlet,
  ],
  templateUrl: './browser.html',
  styleUrl: './browser.css',
})

export class Browser {
  constructor(public gameService: GameService) {}
  currentTab: number = -1;
}
