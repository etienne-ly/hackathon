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

  hasSpellingErrors: boolean;
  wantsToKnow: boolean;
  adsRate: number;
  objective: string = "";

  constructor(private imageService: ImgApiService, private gameService: GameService) {
    this.hasSpellingErrors = Math.random() < 0.3;
    this.adsRate = Math.floor(Math.random() * 10000) + 5000;
    this.wantsToKnow = Math.random() < 0.3;
  }

  ngOnInit(): void {
    console.log(`spelling errors: ${this.hasSpellingErrors}`);

    if (this.wantsToKnow) {
      this.gameService.popup = { url: this.url, title: 'wants to know your location', visible: true, actions: [{name: 'Allow', action: async () => {
        await new Promise(resolve => setTimeout(resolve, 20000));
        this.gameService.popup = {
          visible: true, url: 'Movement detected', title: 'there is someone at your door.', actions: [{name: 'Open', action: () => {this.gameService.danger = 10}}, {name: 'ignore', action: () => {}}]
        }
      }}, {name: 'Deny', action: () => {}}]}
    }

    this.taskId = setInterval(async () => {
      await this.tick();
    }, this.adsRate);
  }

  ngOnDestroy(): void {
    clearInterval(this.taskId);
  }

  checkForObjectiveCompletion() {
    console.log(this.url)
    const valid = !this.wantsToKnow && !this.hasSpellingErrors && this.url.startsWith("https://");
    switch (this.objective) {
      case "pizza":
        if (this.gameService.completion.orderedPizzas) return;
        this.gameService.completion.orderedPizzas = true;
        break;
      case "gift":
        if (this.gameService.completion.gotGift) return;
        this.gameService.completion.gotGift = true;
        break;
      case "cats":
        if (this.gameService.completion.seenCats) return;
        this.gameService.completion.seenCats = true;
        break;
    }

    if (!valid) {
      this.gameService.danger += 4;
    }

    console.log(this.objective + " " + valid);
  }

  async tick(): Promise<void> {
    const valid = !this.hasSpellingErrors && this.url.startsWith("https://");
    if (!valid && Math.random() < 0.3 && this.gameService.dorm.modemWorking) {
      this.gameService.danger += 1;
      this.gameService.dorm.modemWorking = false;
    }

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
