import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-binocular',
  imports: [],
  templateUrl: './binocular.html',
  styleUrl: './binocular.css',
})
export class Binocular implements OnInit {

  search: string = "";

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.search = this.route.snapshot.params['search'];
  }

}
