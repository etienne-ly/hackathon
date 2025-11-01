import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Browser} from './browser/browser';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Browser],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('hackathon');
}
