import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-bad-ending',
  standalone: true,
  template: `
    <div class="ending-container">
      <h1 #animatedText [attr.data-value]="text">{{ displayText }}</h1>
    </div>
  `,
  styles: [`
    .ending-container {
      display: grid;
      place-items: center;
      height: 100vh;
      width: 100vw;
      background-color: black;
      margin: 0;
      overflow: hidden;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9999999;
    }

    h1 {
      font-family: 'Space Mono', monospace;
      font-size: clamp(3rem, 10vw, 10rem);
      color: #a11111;
      padding: 0rem clamp(1rem, 2vw, 3rem);
      border-radius: clamp(0.4rem, 0.75vw, 1rem);
      margin: 0;
    }
  `]
})
export class BadEndingComponent implements OnInit, OnDestroy {
  private readonly letters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  private interval: any = null;

  text: string = "YOU LOST!";
  displayText: string = "YOU LOST!";

  ngOnInit(): void {
    this.startScrambleLoop();
  }

  ngOnDestroy(): void {
    this.clearInterval();
  }

  private startScrambleLoop(): void {
    this.scrambleEffect();
  }

  private scrambleEffect(): void {
    let iteration = 0;

    this.clearInterval();

    this.interval = setInterval(() => {
      this.displayText = this.text
        .split('')
        .map((letter: string, index: number) => {
          if (index < iteration) {
            return this.text[index];
          }

          return this.letters[Math.floor(Math.random() * 26)];
        })
        .join('');

      if (iteration >= this.text.length) {
        this.clearInterval();
        // Restart the effect after 2 seconds
        setTimeout(() => this.scrambleEffect(), 2000);
      }

      iteration += 1 / 3;
    }, 50);
  }

  private clearInterval(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}
