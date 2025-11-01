import {Injectable} from '@angular/core';

declare const puter: any;

@Injectable({
  providedIn: 'root'
})
export class AiService {

  async get<T>(prompt: string): Promise<T> {
    console.log("Sent request to api");
    const data = await puter.ai.chat(prompt);
    const stringData = data.message.content;
    console.log(stringData);
    return JSON.parse(stringData) as T;
  }

}
