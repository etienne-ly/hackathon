import {Component, Input, OnInit, Type} from '@angular/core';
import {AiService} from '../../service/ai.service';
import {WebPage} from '../../models/state';
import {GameService} from '../../service/game.service';
import {NewsTemplate} from '../../templates/news-template/news-template';
import {ForumTemplate} from '../../templates/forum-template/forum-template';
import {ECommerceTemplate} from '../../templates/e-commerce.template/e-commerce.template';
import {BusinessTemplate} from '../../templates/business/business.template';
import {BinocularSkeleton} from './binocular-skeleton/binocular.skeleton';
import {BasePage} from '../base-page/base-page';
import {ImgApiService} from '../../service/imgApi.service';
import {Advertisement} from '../../advertisement/advertisement';

@Component({
  selector: 'app-binocular',
  templateUrl: './binocular.html',
  styleUrl: './binocular.css',
  imports: [
    BinocularSkeleton,
    Advertisement
  ]
})
export class Binocular extends BasePage implements OnInit {

  @Input() replaceTab: Function = () => alert('hell nah');
  @Input() search: string = "";
  results: WebPage[] = [];
  loading: boolean = false;

  constructor(public game: GameService, private aiService: AiService, imageService: ImgApiService) {
    super(imageService, game);
  }

  override async ngOnInit(): Promise<void> {
    super.ngOnInit();

    if (this.search == "") {
      return;
    }
    this.loading = true;

    this.results = await this.aiService.get<WebPage[]>('[{ "template": "news" | "forum" | "e-commerce" | "business", "domain": string, "title": string, "description": string, "url": string }][', this.search, '', false);
    for (let res of this.results) {
      const htt = (Math.floor(Math.random() * 100) < 40 ? "https" : "http") + "://";

      res.url = res.url.replace("https://", "");
      res.url = res.url.replace("http://", "");
      res.url = htt + res.url;
    }
    this.loading = false;
  }

  openPage(page: WebPage) {
    const ref = this.replaceTab(page.title, page.url, this.getComponentFromString(page.template))
    ref.setInput('title', page.title)
    ref.setInput('url', page.url)
  }

  getComponentFromString(value: 'news' | 'forum' | 'e-commerce' | 'business'): Type<any> {
    switch (value) {
      case 'news':
        return NewsTemplate;
      case 'forum':
        return ForumTemplate;
      case 'e-commerce':
        return ECommerceTemplate;
      default:
        return BusinessTemplate;
    }
  }
}
