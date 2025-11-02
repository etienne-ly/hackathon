import {Component, Input, OnInit} from '@angular/core';
import {AiService} from '../../../service/ai.service';

interface PageContent {
  title: string;
  url: string;
  heroImage: string;
  content: string;
  ctaText: string;
}
@Component({
  selector: 'app-business-template',
  templateUrl: './business.template.html',
  styleUrls: ['./business.template.css'],
  imports : []
})
export class BusinessTemplate implements OnInit {
  constructor(private api: AiService) {}
  async ngOnInit() {
    console.log("Sending request to api");
    this.pageContent = await this.api.get<PageContent>("Generate me, in raw JSON format, a webpage content filling this criteria: '{\n" +
      "  title: string;\n" +
      "  url: string;\n" +
      "  heroImage: string;\n" +
      "  content: string;\n" +
      "  ctaText: string; \n" +
      "}', based on the following title: 'Buggle' and the following url: 'www.buggle.com'");
  }

  pageContent?: PageContent;
}
