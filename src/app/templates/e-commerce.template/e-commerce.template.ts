import {Component, Input, OnInit} from '@angular/core';
import {AiService} from '../../service/ai.service';
import {GameService} from '../../service/game.service';
import {NgIf} from '@angular/common';
import {ImgApiService} from '../../service/imgApi.service';
import {BasePage} from '../../main-components/base-page/base-page';
import {Advertisement} from '../../advertisement/advertisement';

interface PageContent {
  "objective": string;
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
    Advertisement
  ],
  templateUrl: './e-commerce.template.html',
  styleUrl: './e-commerce.template.css',
})
export class ECommerceTemplate extends BasePage implements OnInit {

  pageContent?: PageContent;
  image: string = "";
  categoryImages: {[key: string]: string} = {};
  productImages: {[key: string]: string} = {};
  categoryAmounts: {[key: string]: number} = {};

  constructor(private api: AiService, public game: GameService, private imageApi: ImgApiService) {
    super(imageApi, game);
  }

  override async ngOnInit() {
    super.ngOnInit();

    this.pageContent = await this.api.get<PageContent>('{ "objective": string, \"websiteName\": string, \"promotionProduct\": string, \"promotionCatch\": string, \"promotionDescription\": string, \"subPages\": string[], \"categories\": string[], \"products: { \"name\": string; \"category\": string; \"rating\": number; \"price\": number }[9] }', this.title, this.url, this.hasSpellingErrors);
    this.objective = this.pageContent.objective;
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
