import {Component, Input} from '@angular/core';
import {AiService} from '../../service/ai.service';
import {GameService} from '../../service/game.service';

interface PageContent {
  color: string;
  websiteName: string;
  trendingCategories: string[];
  threads: {title: string, description: string, category: string, upvotes: number, comments: number}[];
}

@Component({
  selector: 'app-forum-template',
  imports: [],
  templateUrl: './forum-template.html',
  styleUrl: './forum-template.css',
})
export class ForumTemplate {

  @Input() title: string = "";
  @Input() url: string = "";

  constructor(private api: AiService, public game: GameService) {}

  async ngOnInit() {
    this.pageContent = await this.api.get<PageContent>(`Generate me a webpage content FILLING this format ONLY (no extra words or characters): '{ \"color\": string, \"websiteName\": string, \"trendingCategories\": string[5], \"threads\": { \"title\": string, \"description\": string, \"category\": string, \"upvotes\": number, \"comments\": number }[8] }', based on the following title: '${this.title}' and following url: '${this.url}'`);
  }

  pageContent?: PageContent;
}
