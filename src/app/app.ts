import { Component, signal } from '@angular/core';
import {Browser} from './main-components/browser/browser';
@Component({
  selector: 'app-root',
  imports: [Browser],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('hackathon');
}
