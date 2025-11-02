import {Injectable} from '@angular/core';
import puter from '@heyputer/puter.js';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  async get<T extends {}>(json: string, title: string, url: string, spellingErrors: boolean): Promise<T> {
    const prompt = `
      You are a JSON generator.

      Given the following JSON template:
      ${json}

      Fill all the fields with bogus values based on the provided context.
      Preserve the same structure and keys, but replace types with contextually accurate data.
      If an array is present, fill it with appropriate items.

      Context:
      Search / page title: "${title}"
      Previous page URL: "${url}"

      Rules:
      - Arrays should have at least 8 generated items.
      ${spellingErrors ? '- Generated content has a lot of spelling errors.' : ''}
      - Respond with **only** valid JSON.
      - Do not include comments or explanations.

      Now, return the completed JSON.
    `
    console.log(prompt);
    const data = await puter.ai.chat(prompt);
    const stringData = data.message.content;
    console.log(stringData);
    return JSON.parse(stringData) as T;
  }

}
