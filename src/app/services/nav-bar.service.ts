import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavBarService {
  private titleSource = new BehaviorSubject<string>('Default Title');
  private colorSource = new BehaviorSubject<string>('primary');

  currentTitle = this.titleSource.asObservable();
  currentColor = this.colorSource.asObservable();

  constructor() {}

  setTitle(title: string) {
    this.titleSource.next(title);
  }

  setColor(color: string) {
    this.colorSource.next(color);
  }
}
