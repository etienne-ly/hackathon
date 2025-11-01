import {Injectable} from '@angular/core';
import {CompletionState, DangerState, DormState, Email, Tab, UserInfo} from '../models/state';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public user: UserInfo;

  public dorm: DormState = {
    windowOpen: false,
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
