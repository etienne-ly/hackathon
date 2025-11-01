import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root',

})
export class ImgApiService {
  private readonly apiKey: string = "AIzaSyCeb7S3yC5wmIuRcbkVNtuKUKWyfetMmEA";
  private readonly searchEngineId: string = "c63e2327560b847f4";

  constructor(private http: HttpClient) {
  }

  async FetchImage(query: string): Promise<string> {
    const searchQuery = `${query} business`;
    const encodedQuery = encodeURIComponent(searchQuery);
    const url = `https://www.googleapis.com/customsearch/v1?` +
      `key=${this.apiKey}` +
      `&cx=${this.searchEngineId}` +
      `&q=${encodedQuery}` +
      `&searchType=image` +
      `&num=1` +
      `&imgSize=large`;

    try {
      const response = await firstValueFrom(
        this.http.get<any>(url)
      );
      if (response?.items && response.items.length > 0) {
        const item = response.items[0];

        const imageUrl =
          item.link ||
          item.image?.thumbnailLink ||
          item.pagemap?.cse_image?.[0]?.src ||
          item.pagemap?.cse_thumbnail?.[0]?.src ||
          '';

        if (imageUrl) {
          return imageUrl
        } else {
          console.warn("No items in Google API response:", response);
        }
      }
    } catch (error) {
      console.error("Error fetching image:", error);
      return "null";
    }
    return "puto";
  }

}
