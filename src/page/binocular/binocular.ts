import {Component, Input, OnInit} from '@angular/core';
import {AiService} from '../../service/ai.service';
import {WebPage} from '../../models/state';

@Component({
  selector: 'app-binocular',
  templateUrl: './binocular.html',
  styleUrl: './binocular.css',
})
export class Binocular implements OnInit {

  @Input() search: string = "";
  results: WebPage[] = [];

  constructor(private aiService: AiService) {
  }

  async ngOnInit(): Promise<void> {
    this.results = await this.aiService.get<WebPage[]>(
      `Generate in raw JSON format, a short list of fake websites, based on the search string: "${this.search}", filling this criteria: {domain: string, title: string;  description: string;  url: string;}`);
  }

}
