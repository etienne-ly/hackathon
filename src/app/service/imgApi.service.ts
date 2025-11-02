import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root',

})
export class ImgApiService {

  private sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getImage(query: string, rank: number = 0): Promise<string> {
    const url = `https://corsproxy.io/?https://www.ecosia.org/images?q=${encodeURIComponent(query)}`;

    const response = await fetch(url);
    const html = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const images = Array.from(doc.querySelectorAll('img'));

    const rankedImages: string[] = images
      .map(img => {
        return img.getAttribute('src') || img.getAttribute('data-src') || '';
      })

    await this.sleep(100);
    return rankedImages[rank];
  }

}
