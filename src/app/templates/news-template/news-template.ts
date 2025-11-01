import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../service/api-service';

interface PageContent {
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
    console.log("Sending request to api");
    this.pageContent = await this.api.get<PageContent>("Generate me, in raw JSON format, a webpage content filling this criteria: '{\n" +
      "  title: string;\n" +
      "  highlightTitle: string;\n" +
      "  highlightDescription: string;\n" +
      "  highlightCategory: string;\n" +
      "  latest: { title: string; description: string; category: string }[]\n" +
      "}', based on the following title: 'Buggle' and the following url: 'www.buggle.com'");
  }

  pageContent?: PageContent;
}
