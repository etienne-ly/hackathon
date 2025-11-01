import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from '@angular/common';
import {AdvertisementOffsets, AdvertisementSide} from '../models/state';

@Component({
  selector: 'app-advertisement',
  imports: [
    NgClass
  ],
  templateUrl: './advertisement.html',
  styleUrl: './advertisement.css',
})
export class Advertisement {

  @Input() imageSrc: string = "";
  @Input() side: AdvertisementSide = AdvertisementSide.Bottom;
  @Input() offsets: AdvertisementOffsets = {
    posX: 0,
    posY: 0
  };
  @Output() close = new EventEmitter<void>();

  onClose() {
    console.log(this.side.toString().toLowerCase());
    this.close.emit();
  }

  protected readonly onload = onload;
}
