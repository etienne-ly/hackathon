import {Component, OnInit} from '@angular/core';
import {ImgApiService} from '../service/imgApi.service';
import {NgClass} from '@angular/common';

enum Side {
  Bottom, Left, Right
}

@Component({
  selector: 'app-advertisement',
  imports: [
    NgClass
  ],
  templateUrl: './advertisement.html',
  styleUrl: './advertisement.css',
})
export class Advertisement implements OnInit {

  imageTerms: string[] = [
    "oil ad", "banner advertisement", "diddy concert promotion", "clankers unite"
  ]

  imageSrc: string = "";
  side: Side = Side.Bottom

  constructor(private imageService: ImgApiService) {
  }

  async ngOnInit(): Promise<void> {
    const term = this.imageTerms[Math.floor(Math.random() * this.imageTerms.length)];
    const values = Object.values(Side) as Array<Side>
    this.side = values[Math.floor(Math.random() * this.imageTerms.length)];
    this.imageSrc = await this.imageService.getImage(term);
  }

  close(): void {

  }

}
