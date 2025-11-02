import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdvertisementData, AdvertisementSide} from '../../models/state';
import {ImgApiService} from '../../service/imgApi.service';

@Component({
  selector: 'app-base-page',
  imports: [],
  template: '',
})
export class BasePage implements OnInit, OnDestroy {

  adTerms: string[] = [
    "oil ad", "banner advertisement", "diddy concert promotion", "clankers unite",
    "diddy oil", "clankers"
  ]

  advertisements: AdvertisementData[] = [];
  private taskId: number | undefined;

  constructor(private imageService: ImgApiService) {
  }

  ngOnInit(): void {
    this.taskId = setInterval(async () => {
      await this.tick();
    }, 1000);
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
    const imageSrc = await this.imageService.getImage(term, this.getRandomInt(0, 5));
    const side = values[Math.floor(Math.random() * values.length)];

    this.advertisements.push({
      id: this.advertisements.length,
      imageSrc,
      side,
      offsets: {
        posX: this.getRandomInt(-8, 8),
        posY: this.getRandomInt(-8, 8)
      }
    });
  }

  removeAd(id: number) {
    this.advertisements = this.advertisements.filter(ad => ad.id !== id);
  }

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
