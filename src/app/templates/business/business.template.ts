import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AiService} from '../../../service/ai.service';
import {ImgApiService} from '../../../service/imgApi.service';

interface PageContent {
  title: string;
  email: string;
  phone: string;
  address: string;
  color: string;
  url: string;
  description: string;
  ctaText: string;
}

@Component({
  selector: 'app-business-template',
  templateUrl: './business.template.html',
  styleUrls: ['./business.template.css'],
  imports: [CommonModule]
})
export class BusinessTemplate implements OnInit {
  constructor(private api: AiService, private imgApi : ImgApiService) {
  }

  key: string = "AIzaSyCeb7S3yC5wmIuRcbkVNtuKUKWyfetMmEA";
  cx: string = "c63e2327560b847f4";
  image: string = "";

  async ngOnInit() {
    console.log("Sending request to api");
    this.pageContent = await this.api.get<PageContent>("Generate me a webpage content FILLING this format ONLY (no extra words or characters): '{\n" +
      "  \"color\": string,\n" +
      "  \"email\": string,\n" +
      "  \"phone\": string,\n" +
      "  \"address\": string,\n" +
      "  \"title\": string,\n" +
      "  \"description\": string,\n" +
      "  \"ctaText\": string\n" +
      "}', based on the following title: 'clanker' and the following url: 'www.clanker.com'");

    if (this.pageContent?.title) {
      this.image = await this.imgApi.FetchImage(this.pageContent.title);
    }
  }



  pageContent?: PageContent;
}
