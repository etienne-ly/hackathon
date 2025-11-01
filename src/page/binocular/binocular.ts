import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AiService} from '../../service/ai.service';
import {WebPage} from '../../models/state';

@Component({
  selector: 'app-binocular',
  templateUrl: './binocular.html',
  styleUrl: './binocular.css',
})
export class Binocular implements OnInit {

  search: string = "";
  results: WebPage[] = [];

  constructor(private route: ActivatedRoute, private aiService: AiService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      this.search = params['search'];

      this.results = await this.aiService.get<WebPage[]>(
        `Generate in raw JSON format, a short list of fake websites, based on the search string: "${this.search}", filling this criteria: {domain: string, title: string;  description: string;  url: string;}`)
    })
  }

}
