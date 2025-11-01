import {Component, Input, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-page-base',
  imports: [],
  template: ''
})
export class PageBase implements OnInit, OnDestroy {

  @Input() title: string = "";
  @Input() description: string = "";
  @Input() url: string = "";
  @Input() real: boolean = false;

  private interval_id : number | undefined;

  ngOnInit(): void {
    this.interval_id  = setInterval(() => {
      this.tick();
    }, 1000)
  }

  ngOnDestroy(): void {
    if (this.interval_id == null) {
      return;
    }

    clearInterval(this.interval_id);
  }

  private tick() : void {
    // TODO: Show popup
  }

}
