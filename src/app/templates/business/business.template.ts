import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AiService} from '../../service/ai.service';
import {ImgApiService} from '../../service/imgApi.service';
import {GameService} from '../../service/game.service';
import {LoginOverlayService} from '../../service/login.overlay.service';
import {FormLogin} from '../../form-login/form-login';

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
export class BusinessTemplate implements OnInit {

  @Input() title: string = "";
  @Input() url: string = "";

  constructor(private api: AiService, private imgApi : ImgApiService, public game: GameService,public overlayService: LoginOverlayService) {
  }
  image: string = "";

  async ngOnInit() {
    console.log("Sending request to api");
    this.pageContent = await this.api.get<PageContent>(`Generate me a webpage content FILLING this format ONLY (no extra words or characters): '{\n" +
      "  \"color\": string,\n" +
      "  \"email\": string,\n" +
      "  \"phone\": string,\n" +
      "  \"address\": string,\n" +
      "  \"websiteName\": string,\n" +
      "  \"description\": string,\n" +
      "  \"ctaText\": string\n" +
      "}', based on the following title: '${this.title}' and the following url: '${this.url}'`);

    if (this.pageContent?.websiteName) {
      this.image = await this.imgApi.FetchImage(this.pageContent.websiteName);
    }
  }
  openLogin(): void {
    this.overlayService.open();
  }

  pageContent?: PageContent;
}
