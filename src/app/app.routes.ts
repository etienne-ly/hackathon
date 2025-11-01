import {Routes} from '@angular/router';
import {MailComponent} from './mail-page/mail-page.component';
import {DormComponent} from '../dorm/dorm';

export const routes: Routes = [{
  path: 'insideMail',
  component: MailComponent
}, {
  path: 'dorm',
  component: DormComponent
},
];
