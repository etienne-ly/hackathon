import {Component, OnInit} from '@angular/core';
import {AiService} from '../../service/ai.service';
import {GameService} from '../../service/game.service';

interface PageContent {
  title: string;
  promotionProduct: string;
  promotionCatch: string;
  promotionDescription: string;
  subPages: string[];
  categories: string[];
  products: { name: string; category: string; rating: number; price: number }[];
}

@Component({
  selector: 'app-e-commerce-template',
  imports: [],
  templateUrl: './e-commerce.template.html',
  styleUrl: './e-commerce.template.css',
})
export class ECommerceTemplate implements OnInit {

  constructor(private api: AiService, public game: GameService) {}

  async ngOnInit() {
    this.pageContent = await this.api.get<PageContent>("Generate me a webpage content FILLING this format ONLY (no extra words or characters): '{ \"title\": string, \"promotionProduct\": string, \"promotionCatch\": string, \"promotionDescription\": string, \"subPages\": string[], \"categories\": string[], \"products: { \"name\": string; \"category\": string; \"rating\": number; \"price\": number }[9] }', based on the following title: 'Flexxed' and following url: 'www.flexxed-apparel.com'");
  }

  pageContent?: PageContent;
  protected readonly Math = Math;
}
