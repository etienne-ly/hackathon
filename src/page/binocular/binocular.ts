import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../service/api-service';
import {WebPage} from '../../models/state';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-binocular',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './binocular.html',
  styleUrl: './binocular.css',
})
export class Binocular implements OnInit {

  search: string = "";
  results: WebPage[] = [
    {
      domain: 'Deezer',
      url: 'deez.nuts',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vestibulum lacus eget vestibulum semper. Fusce varius in ligula vel lacinia. In sodales eu nulla id venenatis. Nunc imperdiet nisl velit, quis varius lacus venenatis vel. Duis hendrerit pharetra tempus. Integer odio urna, fringilla non mauris id, luctus cursus urna. Proin semper elementum metus, at auctor neque bibendum in. Nullam vel nunc eros. Ut gravida aliquam dictum. Phasellus augue dolor, pretium et ipsum scelerisque, dignissim volutpat sapien. Quisque at augue nibh. ',
      title: 'Deez nuts',
    },
    {
      domain: 'Deezer',
      url: 'deez.nuts',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vestibulum lacus eget vestibulum semper. Fusce varius in ligula vel lacinia. In sodales eu nulla id venenatis. Nunc imperdiet nisl velit, quis varius lacus venenatis vel. Duis hendrerit pharetra tempus. Integer odio urna, fringilla non mauris id, luctus cursus urna. Proin semper elementum metus, at auctor neque bibendum in. Nullam vel nunc eros. Ut gravida aliquam dictum. Phasellus augue dolor, pretium et ipsum scelerisque, dignissim volutpat sapien. Quisque at augue nibh. ',
      title: 'Deez nuts',
    }
  ];

  constructor(private route: ActivatedRoute, private aiService: ApiService) {
  }

  async ngOnInit(): Promise<void> {
    this.search = this.route.snapshot.params['search'];

    console.log("waiting")
    const result = await this.aiService.get<WebPage[]>(
      `Generate in JSON format, a short list of fake websites filling this criteria: export interface WebPage {title: string;  description: string;  url: string;} based on the search string: "${this.search}"`)
    console.log(result);
  }

}
