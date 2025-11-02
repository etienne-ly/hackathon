import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AiService} from '../../service/ai.service';
import {ImgApiService} from '../../service/imgApi.service';
import {GameService} from '../../service/game.service';
import {LoginOverlayService} from '../../service/login.overlay.service';
import {FormLogin} from '../../form-componentes/form-login/form-login';
import {BasePage} from '../../main-components/base-page/base-page';
import {Advertisement} from '../../advertisement/advertisement';

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
  imports: [CommonModule, FormLogin, Advertisement]
})
export class BusinessTemplate extends BasePage implements OnInit {

  @Input() title: string = "";
  @Input() url: string = "";
  image: string = "";
  featureImage: string = "";
  pageContent?: PageContent;

  constructor(private api: AiService, private imgApi : ImgApiService, public game: GameService,public overlayService: LoginOverlayService) {
    super(imgApi)
  }

  override async ngOnInit() {
    super.ngOnInit();

    console.log("Sending request to api");
    this.pageContent = await this.api.get<PageContent>(`Generate me a webpage content ${true ? 'CONTAINING OBVIOUS GRAMMATICAL ERRORS and' : ''} FILLING this format ONLY (no extra words or characters): '{\n" +
      "  \"color\": string,\n" +
      "  \"email\": string,\n" +
      "  \"phone\": string,\n" +
      "  \"address\": string,\n" +
      "  \"websiteName\": string,\n" +
      "  \"description\": string,\n" +
      "  \"ctaText\": string\n" +
      "}', based on the following title: '${this.title}' and the following url: '${this.url}'`);

    if (this.pageContent?.websiteName) {
      this.image = await this.imgApi.getImage(this.pageContent.websiteName);
      this.featureImage = await this.imgApi.getImage(`${this.pageContent.websiteName} features`);
    }
  }

  openLogin(): void {
    this.overlayService.open();
  }

}
