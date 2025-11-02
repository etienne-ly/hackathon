import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AdvertisementData, AdvertisementSide} from '../../models/state';
import {ImgApiService} from '../../service/imgApi.service';

@Component({
  selector: 'app-base-page',
  imports: [],
  template: '',
})
export class BasePage implements OnInit, OnDestroy {

  adTerms: string[] = [
    "oil ad", "banner advertisement", "diddy concert promotion", "clankers unite"
  ]

  @Input() title: string = "";
  @Input() url: string = "";

  advertisements: AdvertisementData[] = [];
  private taskId: number | undefined;

  isPageSafe: boolean = false;
  hasSpellingErrors: boolean = Math.floor(Math.random() * 100) < 30;

  constructor(private imageService: ImgApiService) {
    console.log(this.hasSpellingErrors);
  }

  ngOnInit(): void {
    this.taskId = setInterval(async () => {
      await this.tick();
    }, 1000);
    this.isPageSafe = this.advertisements.length < 5 && this.url.startsWith("https");
  }

  ngOnDestroy(): void {
    clearInterval(this.taskId);
  }

  async tick(): Promise<void> {
    console.log('adding ad')

    // TODO: Add unique max per page
    if (this.advertisements.length > 10) {
      return
    }

    const term = this.adTerms[Math.floor(Math.random() * this.adTerms.length)];
    const values = Object.values(AdvertisementSide) as Array<AdvertisementSide>
    const imageSrc = await this.imageService.getImage(term);
    const side = values[Math.floor(Math.random() * values.length)];

    this.advertisements.push({
      id: this.advertisements.length,
      imageSrc,
      side
    });
  }

  removeAd(id: number) {
    this.advertisements.splice(id, 1);
  }

}
