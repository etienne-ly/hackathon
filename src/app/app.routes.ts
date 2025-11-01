import {Routes} from '@angular/router';
import {Binocular} from '../page/binocular/binocular';

export const routes: Routes = [
  {path: 'binocular', component: Binocular},
  {path: '', redirectTo: '/binocular', pathMatch: 'full'},
  {path: '**', redirectTo: '/binocular'},
];
