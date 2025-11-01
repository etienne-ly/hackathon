import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  async get<T>(prompt: string): Promise<T> {
    console.log("Sent request to api");
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "deepseek/deepseek-chat-v3.1:free",
        "messages": [
          {
            "role": "user",
            "content": prompt
          }
        ]
      })
    });
    const data = await res.json();
    console.log(data);
    const stringData = data.choices[0].message.content;
    console.log(stringData);
    return JSON.parse(stringData) as T;
  }
}
