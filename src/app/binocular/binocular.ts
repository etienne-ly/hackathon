import {Component, Input, OnInit} from '@angular/core';
import {AiService} from '../service/ai.service';
import {WebPage} from '../models/state';

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
      `Generate me a JSON list of at least 10 fake websites with descriptions of at least 200 characters, the websites can be https or http randomly, FILLING this format ONLY (no extra words or characters): '{"title": string, "domain": string, "description": string, "url": string}', based on the following query string: '${this.search}'`);
  }

}
