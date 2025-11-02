import {Injectable} from '@angular/core';
import {puter} from '@heyputer/puter.js';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  async get<T>(prompt: string): Promise<T> {
    console.log("Sent request to api");
    const data = await puter.ai.chat(prompt);
    const stringData = data.message.content;
    console.log(stringData);
    return JSON.parse(stringData) as T;
  }
}
