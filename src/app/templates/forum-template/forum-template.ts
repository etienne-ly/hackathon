import {Component, Input, OnInit} from '@angular/core';
import {AiService} from '../../service/ai.service';
import {GameService} from '../../service/game.service';
import {ImgApiService} from '../../service/imgApi.service';
import {BasePage} from '../../main-components/base-page/base-page';
import {Advertisement} from '../../advertisement/advertisement';

interface PageContent {
  color: string;
  websiteName: string;
  trendingCategories: string[];
  threads: {title: string, description: string, category: string, upvotes: number, comments: number}[];
}

@Component({
  selector: 'app-forum-template',
  imports: [
    Advertisement
  ],
  templateUrl: './forum-template.html',
  styleUrl: './forum-template.css',
})
export class ForumTemplate extends BasePage implements OnInit {

  @Input() title: string = "";
  @Input() url: string = "";
  pageContent?: PageContent;
  images: {[key: string]: string} = {};

  constructor(private api: AiService, public game: GameService, private imageApi: ImgApiService) {
    super(imageApi)
  }

  override async ngOnInit() {
    super.ngOnInit();

    this.pageContent = await this.api.get<PageContent>(`Generate me a webpage content FILLING this format ONLY (no extra words or characters): '{ \"color\": string, \"websiteName\": string, \"trendingCategories\": string[5], \"threads\": { \"title\": string, \"description\": string, \"category\": string, \"upvotes\": number, \"comments\": number }[8] }', based on the following title: '${this.title}' and following url: '${this.url}'`);
    for (let thread of this.pageContent.threads) {
      this.images[thread.title] = await this.imageApi.getImage(thread.title);
    }
  }

}
