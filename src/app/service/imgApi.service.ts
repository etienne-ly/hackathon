import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root',

})
export class ImgApiService {

  async getImage(query: string, rank: number = 0): Promise<string> {
    const url = `https://corsproxy.io/?https://search.brave.com/images?q=${encodeURIComponent(query)}`;

    const response = await fetch(url);
    const html = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const images = Array.from(doc.querySelectorAll('img[data-rank]'));

    const rankedImages: string[] = images
      .map(img => {
        return img.getAttribute('src') || img.getAttribute('data-src') || '';
      })

    return rankedImages[rank];
  }

}
