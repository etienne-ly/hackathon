import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../../service/api-service';
import {RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';

interface PageContent {
  title: string;
  email: string;
  phone: string;
  address: string;
  color: string;
  url: string;
  heroImage: string;
  description: string;
  content: string;
  ctaText: string;
}
@Component({
  selector: 'app-business-template',
  templateUrl: './business.template.html',
  styleUrls: ['./business.template.css'],
  imports : [CommonModule]
})
export class BusinessTemplate implements OnInit {
  constructor(private api: ApiService) {}
  async ngOnInit() {
    console.log("Sending request to api");
    this.pageContent = await this.api.get<PageContent>("Generate me a webpage content FILLING this format ONLY (no extra words or characters): '{\n" +
      "  \"color\": string,\n" +
      "  \"title\": string,\n" +
      "  \"highlightDescription\": string,\n" +
      "}', based on the following title: 'hackathon' and the following url: 'www.hackathons.com'");
  }

  pageContent?: PageContent;



}
