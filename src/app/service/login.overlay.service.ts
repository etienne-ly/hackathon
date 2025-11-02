import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginOverlayService {
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  public isOpen$ = this.isOpenSubject.asObservable();

  /**
   * Opens the login overlay
   */
  open(): void {
    this.isOpenSubject.next(true);

    document.body.style.overflow = 'hidden';
  }

  /**
   * Closes the login overlay
   */
  close(): void {
    this.isOpenSubject.next(false);
    // Restore body scroll
    document.body.style.overflow = 'auto';
  }

  /**
   * Toggles the login overlay
   */
  toggle(): void {
    if (this.isOpenSubject.value) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Gets current state
   */
  isOpen(): boolean {
    return this.isOpenSubject.value;
  }
}
