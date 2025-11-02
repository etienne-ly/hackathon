import { Component } from '@angular/core';
import {GameService} from '../service/game.service';

@Component({
  selector: 'app-dorm',
  imports: [],
  templateUrl: './dorm.html',
  styleUrl: './dorm.css',
})
export class DormComponent {

  fixingModem: boolean = false;
  switchingVpn: boolean = false;

  constructor(public game: GameService) {
  }

  rebootModem() {
    if (this.game.dorm.fixing) {
      return;
    }

    this.fixingModem = true;
    this.game.dorm.fixing = true;
    setTimeout(() => {
      this.game.dorm.fixing = false;
      this.fixingModem = false;
      this.game.dorm.modemWorking = true;
    }, 5000)
  }

  switchVpn() {
    if (this.game.dorm.fixing || this.game.dorm.vpnUsed) {
      return;
    }

    this.switchingVpn = true;
    this.game.dorm.fixing = true;
    setTimeout(() => {
      this.game.dorm.fixing = false;
      this.switchingVpn = false;
      this.game.dorm.vpnUsed = true;
      this.game.danger -= 5;
    }, 5000)
  }

}
