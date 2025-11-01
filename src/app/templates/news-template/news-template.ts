import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../service/api-service';

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
  imports: [],
  templateUrl: './news-template.html',
  styleUrl: './news-template.css',
})
export class NewsTemplate implements OnInit {
  constructor(private api: ApiService) {}

  async ngOnInit() {
    this.pageContent = await this.api.get<PageContent>("Generate me a webpage content FILLING this format ONLY (no extra words or characters): '{\n" +
      "  \"color\": string,\n" +
      "  \"title\": string,\n" +
      "  \"highlightTitle\": string,\n" +
      "  \"highlightDescription\": string,\n" +
      "  \"highlightCategory\": string,\n" +
      "  \"latest\": { \"title\": string, \"description\": string, \"category\": string }[9]\n" +
      "}', based on the following title: 'Buggle' and the following url: 'www.buggle.com'");
  }

  pageContent?: PageContent;
}
