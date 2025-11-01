import {Injectable} from '@angular/core';
import {CompletionState, DormState, Email, Popup, Tab, UserInfo} from '../models/state';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public user: UserInfo;

  public popup: Popup = {
    visible: true,
    url: 'www.p-diddy.cp',
    title: 'wants to know your location',
    actions: [{name: 'Allow', action: () => {}}, {name: 'Deny', action: () => {}}],
  }

  public dorm: DormState = {
    vpnUsed: false,
    modemWorking: true,
    fixing: false
  };

  public completion: CompletionState = {
    orderedPizzas: false,
    driversLicense: false,
    classChoice: false
  };

  public danger: number = 0;

  public emails: Email[] = [
    {
      id: 0,
      subject: 'Chores',
      sender: {
        name: 'Mom',
        email: 'mom@insidemail.com',
        DateSend: 'Today',
        TimeSend: 'Today'
      },
      read: false,
      important: true,
      content: `
        <p>Hello son, here's a list of chores for you...</p>
        <ul>
            <li><strike-if done="orderedPizzas">Order pizza for your brother's birthday</strike-if></li>
            <li><strike-if done="cleanRoom">Clean your room</strike-if></li>
        </ul>
      `
    }
  ];

  constructor() {
    // TODO: Randomly generate this
    this.user = {
      address: "",
      email: "",
      nas: 1
    }
  }

}
