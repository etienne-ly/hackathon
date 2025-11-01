import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from '@angular/common';
import {AdvertisementSide} from '../models/state';

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
  @Input() side: AdvertisementSide = AdvertisementSide.Bottom
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  protected readonly onload = onload;
}
