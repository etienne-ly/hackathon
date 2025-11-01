import {Component, Input, OnInit} from '@angular/core';
import {AiService} from '../../service/ai.service';
import {GameService} from '../../service/game.service';
import {NgIf} from '@angular/common';

interface PageContent {
  websiteName: string;
  promotionProduct: string;
  promotionCatch: string;
  promotionDescription: string;
  subPages: string[];
  categories: string[];
  products: { name: string; category: string; rating: number; price: number }[];
}

@Component({
  selector: 'app-e-commerce-template',
  imports: [
    NgIf
  ],
  templateUrl: './e-commerce.template.html',
  styleUrl: './e-commerce.template.css',
})
export class ECommerceTemplate implements OnInit {

  @Input() title: string = "";
  @Input() url: string = "";
  pageContent?: PageContent;
  protected readonly Math = Math;

  constructor(private api: AiService, public game: GameService) {}

  async ngOnInit() {
    this.pageContent = await this.api.get<PageContent>(`Generate me a webpage content FILLING this format ONLY (no extra words or characters): '{ \"websiteName\": string, \"promotionProduct\": string, \"promotionCatch\": string, \"promotionDescription\": string, \"subPages\": string[], \"categories\": string[], \"products: { \"name\": string; \"category\": string; \"rating\": number; \"price\": number }[9] }', based on the following title: '${this.title}' and following url: '${this.url}'`);
  }

}
