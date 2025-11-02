import {Injectable} from '@angular/core';
import {CompletionState, DangerState, DormState, Email, Popup, Tab, UserInfo} from '../models/state';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public user: UserInfo;
  public hasWifi: boolean = true;

  public popup: Popup = {
    visible: true,
    url: 'www.p-diddy.cp',
    title: 'wants to know your location',
    actions: [{name: 'Allow', action: () => {}}, {name: 'Deny', action: () => {}}],
  }

  public dorm: DormState = {
    windowOpen: false,
    modemWorking: false
  };

  public completion: CompletionState = {
    orderedPizzas: false,
    driversLicense: false,
    classChoice: false
  };

  public danger: DangerState = {
    fakeEmailChance: 0
  };

  public emails: Email[] = [];

  constructor() {
    // TODO: Randomly generate this
    this.user = {
      address: "",
      email: "",
      nas: 1
    }
  }

}
