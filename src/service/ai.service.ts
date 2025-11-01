import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  async get<T>(prompt: string): Promise<T> {
    console.log("Sent request to api");
    const res = await fetch("https://llm.chutes.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer cpk_a3b427b1eb194295b94f727202913346.0bbed26ece1a53669ce3f6ba79cfb124.U8PJMHoqB9lfuijCsCMJCEQd9cDMv4CU",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "openai/gpt-oss-20b",
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
