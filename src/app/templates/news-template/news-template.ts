import {Component, OnInit} from '@angular/core';
import {AiService} from '../../service/ai.service';
import {ImgApiService} from '../../service/imgApi.service';
import {CommonModule} from '@angular/common';
import {GameService} from '../../service/game.service';

interface PageContent {
  color: string;
  title: string;
  highlightTitle: string;
  highlightDescription: string;
  highlightCategory: string;
  latest: { title: string; description: string; category: string }[]
}

@Component({
  selector: 'app-news-template',
  imports: [CommonModule],
  templateUrl: './news-template.html',
  styleUrl: './news-template.css',
})
export class NewsTemplate implements OnInit {

  imgUrl:string="";
  pageContent?: PageContent;

  constructor(private api: AiService,private imgApi:ImgApiService, public game: GameService) { }

  async ngOnInit() {
    this.pageContent = await this.api.get<PageContent>("Generate me a webpage content FILLING this format ONLY (no extra words or characters): '{\n" +
      "  \"color\": string,\n" +
      "  \"title\": string,\n" +
      "  \"highlightTitle\": string,\n" +
      "  \"highlightDescription\": string,\n" +
      "  \"highlightCategory\": string,\n" +
      "  \"latest\": { \"title\": string, \"description\": string, \"category\": string }[9]\n" +
      "}', based on the following title: 'Buggle' and the following url: 'www.buggle.com'");

    if (this.pageContent?.title) {
      this.imgUrl = await this.imgApi.FetchImage(this.pageContent.title);
    }
  }


}
