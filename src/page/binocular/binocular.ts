import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../service/api-service';

@Component({
  selector: 'app-binocular',
  imports: [],
  templateUrl: './binocular.html',
  styleUrl: './binocular.css',
})
export class Binocular implements OnInit {

  search: string = "";

  constructor(private route: ActivatedRoute, private aiService: ApiService) {
  }

  async ngOnInit(): Promise<void> {
    this.search = this.route.snapshot.params['search'];

    console.log("waiting")
    const result = await this.aiService.get(`Generate me in RAW JSON format a short list of fake websites that have 1. a title, 2. a url and 3. a description based on the search string: "${this.search}"`)
    console.log(result);
  }

}
