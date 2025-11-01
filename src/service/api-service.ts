import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  async get(prompt: string) {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "minimax/minimax-m2:free",
        "messages": [
          {
            "role": "user",
            "content": prompt
          }
        ]
      })
    });
    const data = await res.json();
    console.log(data.choices[0].message.content);
    return data;
  }
}
