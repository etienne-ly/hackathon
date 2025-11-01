import { Component, signal } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MailComponent} from './mail-page/mail-page.component';
import {Browser} from './browser/browser';
import {BusinessTemplate} from './templates/business/business.template';

@Component({
  selector: 'app-root',
  imports: [Browser, BusinessTemplate, RouterOutlet, MailComponent,RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('hackathon');
}
