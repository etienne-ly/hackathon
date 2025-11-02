import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AdvertisementData, AdvertisementSide} from '../../models/state';
import {ImgApiService} from '../../service/imgApi.service';
import {GameService} from '../../service/game.service';

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

  @Input() title: string = "";
  @Input() url: string = "";

  advertisements: AdvertisementData[] = [];
  private taskId: number | undefined;

  hasSpellingErrors: boolean = Math.floor(Math.random() * 100) < 30;
  adsRate: number = Math.floor(Math.random() * 10000) + 5000;
  objective: string = "";

  constructor(private imageService: ImgApiService, private gameService: GameService) {
    console.log(this.hasSpellingErrors);
  }

  ngOnInit(): void {
    this.taskId = setInterval(async () => {
      await this.tick();
    }, this.adsRate);
  }

  ngOnDestroy(): void {
    clearInterval(this.taskId);
  }

  checkForObjectiveCompletion() {
    const valid = !this.hasSpellingErrors && this.url.startsWith("https://");
    switch (this.objective) {
      case "pizza": this.gameService.completion.orderedPizzas = valid; break;
      case "gift": this.gameService.completion.gotGift = valid; break;
      case "cats": this.gameService.completion.seenCats = valid; break;
    }
    console.log(this.objective + " " + valid);
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
