import {Routes} from '@angular/router';
import {Binocular} from '../page/binocular/binocular';

export const routes: Routes = [
  {path: 'binocular/:search', component: Binocular},
  {path: '', component: Binocular, pathMatch: 'full'},
  {path: '**', redirectTo: '/binocular'},
];
