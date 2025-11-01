import {Component, Input} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Tab} from '../../models/state';

@Component({
  selector: 'app-browser',
  imports: [
    RouterOutlet
  ],
  templateUrl: './browser.html',
  styleUrl: './browser.css',
})

export class Browser {
  @Input() tabs?: Array<Tab>;

  currentTab: number = 0;
}
