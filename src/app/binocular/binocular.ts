import {Component, Input, OnInit, Type} from '@angular/core';
import {AiService} from '../service/ai.service';
import {WebPage} from '../models/state';
import {GameService} from '../service/game.service';
import {NewsTemplate} from '../templates/news-template/news-template';
import {ForumTemplate} from '../templates/forum-template/forum-template';
import {ECommerceTemplate} from '../templates/e-commerce.template/e-commerce.template';
import {BusinessTemplate} from '../templates/business/business.template';

@Component({
  selector: 'app-binocular',
  templateUrl: './binocular.html',
  styleUrl: './binocular.css',
})
export class Binocular implements OnInit {

  @Input() replaceTab: Function = () => alert('hell nah');
  @Input() search: string = "";
  results: WebPage[] = [];

  constructor(public game: GameService, private aiService: AiService) {}

  async ngOnInit(): Promise<void> {
    if (this.search == "") {
      return;
    }
    this.results = await this.aiService.get<WebPage[]>(`Generate me fake webpage content FILLING this JSON format ONLY (no extra words or characters): { "template": "news" | "forum" | "e-commerce" | "business", "domain": string, "title": string, "description": string, "url": string }[12], based on the following search string: "${this.search}".`)
  }

  getComponentFromString(value: 'news' | 'forum' | 'e-commerce' | 'business'): Type<any> {
    switch (value) {
      case 'news': return NewsTemplate;
      case 'forum': return ForumTemplate;
      case 'e-commerce': return ECommerceTemplate;
      default: return BusinessTemplate;
    }
  }
}
