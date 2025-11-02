import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AiService} from '../../service/ai.service';
import {ImgApiService} from '../../service/imgApi.service';
import {GameService} from '../../service/game.service';
import {LoginOverlayService} from '../../service/login.overlay.service';
import {FormLogin} from '../../form-componentes/form-login/form-login';
import {BasePage} from '../../main-components/base-page/base-page';

interface PageContent {
  websiteName: string;
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
  imports: [CommonModule, FormLogin]
})
export class BusinessTemplate extends BasePage implements OnInit {

  image: string = "";
  featureImage: string = "";
  pageContent?: PageContent;

  constructor(private api: AiService, private imgApi : ImgApiService, public game: GameService,public overlayService: LoginOverlayService) {
    super(imgApi)
  }

  override async ngOnInit() {
    super.ngOnInit();

    console.log("Sending request to api");
    this.pageContent = await this.api.get<PageContent>('{ "websiteName": string, "email": string, "phone": string, "address": string, "color": string, "url": string, "description": string, "ctaText": string }', this.title, this.url, this.hasSpellingErrors);

    if (this.pageContent?.websiteName) {
      this.image = await this.imgApi.getImage(this.pageContent.websiteName);
      this.featureImage = await this.imgApi.getImage(`${this.pageContent.websiteName} features`);
    }
  }

  openLogin(): void {
    this.overlayService.open();
  }

}
