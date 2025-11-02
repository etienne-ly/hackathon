import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {GameService} from '../../service/game.service';
import {Email, Sender} from '../../models/state';

@Component({
  selector: 'app-mail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mail-page.component.html',
  styleUrls: ['./mail-page.component.css']
})
export class MailComponent implements OnInit {

  constructor(public game: GameService) {
  }

  ngOnInit(): void {
    // this.emails = this.generateEmails(50);
  }

  get emailContent(): string {
    return this.generateEmailContent(this.selectedEmail!.content, this.game.completion);
  }

  generateEmailContent(template: string, data: any): string {
    return template
      // Process <strike-if done="variable">content</strike-if>
      .replace(/<strike-if done="(.*?)">(.*?)<\/strike-if>/g, (_, boolVar, content) => {
        const shouldStrike = !!data[boolVar.trim()];
        return shouldStrike ? `<s>${content}</s>` : content;
      });
  }

  private generateEmails(count: number): Email[] {
    const subjects = [
      'Meeting Notes', 'Get Pizza', 'Driver License Renewal', 'Project Update',
      'Invoice', 'Welcome!', 'Ticket Update', 'Action Required', 'Family Photos', 'Event Invite'
    ];
    const senderNames = ['John Smith', 'Sarah Johnson', 'Acme HR', 'No-Reply', 'Support Team', 'Team Lead', 'Alice Brown', 'Bob Green'];
    const contents = [
      'Please review the attached document.',
      'Quick update on the project status.',
      'Don\'t forget to complete the form.',
      'Here are the details you requested.',
      'Thanks for your time today.',
      '<a href="https://example.com">Click here</a>',
    ];

    const list: Email[] = [];
    for (let i = 1; i <= count; i++) {
      const subject = subjects[i % subjects.length] + (i % 5 === 0 ? ' (follow-up)' : '');
      const senderName = senderNames[i % senderNames.length];
      const date = i % 3 === 0 ? 'Today' : (i % 3 === 1 ? 'Yesterday' : `Oct ${10 + (i % 20)}`);
      const time = `${8 + (i % 9)}:${(i % 2 === 0 ? '00' : '30')} ${i % 24 < 12 ? 'AM' : 'PM'}`;

      const sender: Sender = {
        name: senderName,
        email: `${senderName.split(' ')[0].toLowerCase()}${i}@example.com`,
        DateSend: date,
        TimeSend: time
      };

      const content = contents[i % contents.length];
      const hasUrl = (i % 7 === 0) || (Math.random() < 0.18);

      // Use simple HTML in content so it renders as clickable links via [innerHTML]
      let emailContent = `Hello,<br/><br/>${content}<br/><br/>Regards,<br/>${sender.name}`;

      if (hasUrl) {
        const url = `https://fake.example.com/resource/${i}`;
        // Insert a clear clickable anchor that points to the fake site
        emailContent = `Hello,<br/><br/>${content} <a href="${url}" target="_blank" rel="noopener noreferrer">Visit this site</a><br/><br/>Regards,<br/>${sender.name}`;
      }

      const email: Email = {
        id: i,
        subject,
        sender,
        read: i % 4 === 0, // some read, some unread
        important: i % 8 === 0,
        content: emailContent
      };

      list.push(email);
    }

    return list;
  }

  selectedEmail: Email | null = null;

  selectEmail(email: Email): void {
    this.selectedEmail = email;

    if (!email.read) {
      email.read = true;
    }
  }

  toggleImportant(email: Email): void {
    email.important = !email.important;
  }

  getUnreadCount(): number {
    return this.game.emails.filter(email => !email.read).length;
  }
}
