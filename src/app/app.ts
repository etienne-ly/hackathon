import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MailComponent} from './mail-page/mail-page.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MailComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('hackathon');
}
