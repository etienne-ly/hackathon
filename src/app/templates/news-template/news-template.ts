import {Component, Input, OnInit} from '@angular/core';
import {AiService} from '../../service/ai.service';
import {ImgApiService} from '../../service/imgApi.service';
import {CommonModule} from '@angular/common';
import {GameService} from '../../service/game.service';
import {BasePage} from '../../main-components/base-page/base-page';
import {Advertisement} from '../../advertisement/advertisement';

interface PageContent {
  color: string;
  websiteName: string;
  highlightTitle: string;
  highlightDescription: string;
  highlightCategory: string;
  latest: { title: string; description: string; category: string }[]
}

@Component({
  selector: 'app-news-template',
  imports: [CommonModule, Advertisement],
  templateUrl: './news-template.html',
  styleUrl: './news-template.css',
})
export class NewsTemplate extends BasePage implements OnInit {

  @Input() title: string = "";
  @Input() url: string = "";

  imgUrl:string="";
  images: {[key: string]: string} = {};

  pageContent?: PageContent;

  constructor(private api: AiService, public imgApi:ImgApiService, public game: GameService) {
    super(imgApi)
  }

  override async ngOnInit() {
    super.ngOnInit();

    this.pageContent = await this.api.get<PageContent>(`Generate me a webpage content FILLING this format ONLY (no extra words or characters): '{\n" +
      "  \"color\": string,\n" +
      "  \"websiteName\": string,\n" +
      "  \"highlightTitle\": string,\n" +
      "  \"highlightDescription\": string,\n" +
      "  \"highlightCategory\": string,\n" +
      "  \"latest\": { \"title\": string, \"description\": string, \"category\": string }[9]\n" +
      "}', based on the following title: '${this.title}' and the following url: '${this.url}'`);

    if (this.pageContent?.websiteName) {
      this.imgUrl = await this.imgApi.getImage(this.pageContent.websiteName);
    }

    for (let latest of this.pageContent.latest) {
      this.images[latest.title] = await this.imgApi.getImage(latest.title)
    }
  }
}
