import {Component, Input, OnInit} from '@angular/core';
import {AiService} from '../../service/ai.service';
import {GameService} from '../../service/game.service';
import {ImgApiService} from '../../service/imgApi.service';
import {BasePage} from '../../main-components/base-page/base-page';
import {Advertisement} from '../../advertisement/advertisement';
import {LoginOverlayService} from '../../service/login.overlay.service';
import {FormLogin} from '../../form-componentes/form-login/form-login';
import {NgIf} from '@angular/common';

interface PageContent {
  "objective": string;
  color: string;
  websiteName: string;
  trendingCategories: string[];
  threads: {title: string, description: string, category: string, upvotes: number, comments: number}[];
}

@Component({
  selector: 'app-forum-template',
  imports: [
    Advertisement,
    FormLogin,
    NgIf
  ],
  templateUrl: './forum-template.html',
  styleUrl: './forum-template.css',
})
export class ForumTemplate extends BasePage implements OnInit {

  pageContent?: PageContent;
  images: {[key: string]: string} = {};

  constructor(private api: AiService, public game: GameService, private imageApi: ImgApiService, public loginOverlayService: LoginOverlayService) {
    super(imageApi, game)
  }

  override async ngOnInit() {
    super.ngOnInit();

    this.pageContent = await this.api.get<PageContent>('{ "objective": string, \"color\": string, \"websiteName\": string, \"trendingCategories\": string[5], \"threads\": { \"title\": string, \"description\": string, \"category\": string, \"upvotes\": number, \"comments\": number }[8] }', this.title, this.url, this.hasSpellingErrors);
    for (let thread of this.pageContent.threads) {
      this.images[thread.title] = await this.imageApi.getImage(thread.title);
    }

    this.objective = this.pageContent.objective;
  }
}
