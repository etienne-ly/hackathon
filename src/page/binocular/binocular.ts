import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageBase} from '../page-base/page-base';
import {Pizza} from '../pizza/pizza';
import {Drivers} from '../drivers/drivers';

@Component({
  selector: 'app-binocular',
  imports: [],
  templateUrl: './binocular.html',
  styleUrl: './binocular.css',
})
export class Binocular implements OnInit {

  search: string = "";
  components = [Pizza, Drivers]

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.search = this.route.snapshot.params['search'];


  }

}
