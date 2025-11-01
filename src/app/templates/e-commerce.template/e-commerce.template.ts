import {Component, Input, OnInit} from '@angular/core';
import {AiService} from '../../service/ai.service';
import {GameService} from '../../service/game.service';
import {NgIf} from '@angular/common';
import {ImgApiService} from '../../service/imgApi.service';

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
  image: string = "";
  categoryImages: {[key: string]: string} = {};
  productImages: {[key: string]: string} = {};
  categoryAmounts: {[key: string]: number} = {};

  constructor(private api: AiService, public game: GameService, private imageApi: ImgApiService) {}

  async ngOnInit() {
    this.pageContent = await this.api.get<PageContent>(`Generate me a webpage content FILLING this format ONLY (no extra words or characters): '{ \"websiteName\": string, \"promotionProduct\": string, \"promotionCatch\": string, \"promotionDescription\": string, \"subPages\": string[], \"categories\": string[], \"products: { \"name\": string; \"category\": string; \"rating\": number; \"price\": number }[9] }', based on the following title: '${this.title}' and following url: '${this.url}'`);
    this.image = await this.imageApi.getImage(`${this.pageContent.websiteName} banner`);
    for (let category of this.pageContent.categories) {
      this.categoryImages[category] = await this.imageApi.getImage(category);
      this.categoryAmounts[category] = Math.floor(Math.random() * 300)
    }

    for (let product of this.pageContent.products) {
      this.productImages[product.name] = await this.imageApi.getImage(product.name);
    }
  }

}
