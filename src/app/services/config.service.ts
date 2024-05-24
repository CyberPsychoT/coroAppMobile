import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private LARGE_TEXT_KEY = 'largeTextEnabled'; //Para canciones Celular
  private LARGE_LIST_TEXT_KEY = 'largeListTextEnabled'; //Para listas Celular
  private LARGE_TEXT_TABLET_KEY = 'largeTextTablet'; //Para listas Tablet
  private LARGE_LIST_TEXT_TABLET_KEY = 'largeListTextTablet'; //Para listas Tablet

  constructor() {}
  //Canciones aumentar texto
  isLargeTextEnabled(): boolean {
    const item = localStorage.getItem(this.LARGE_TEXT_KEY);
    return item ? JSON.parse(item) : false;
  }

  setLargeTextEnabled(isEnabled: boolean): void {
    localStorage.setItem(this.LARGE_TEXT_KEY, JSON.stringify(isEnabled));
  }

  isLargeListTextEnabled(): boolean {
    const item = localStorage.getItem(this.LARGE_LIST_TEXT_KEY);
    return item ? JSON.parse(item) : false;
  }

  setLargeListTextEnabled(isEnabled: boolean): void {
    localStorage.setItem(this.LARGE_LIST_TEXT_KEY, JSON.stringify(isEnabled));
  }

  isLargeTextTabletEnabled(): boolean {
    const item = localStorage.getItem(this.LARGE_TEXT_TABLET_KEY);
    return item ? JSON.parse(item) : false;
  }

  setLargeTextTabletEnabled(isEnabled: boolean): void {
    localStorage.setItem(this.LARGE_TEXT_TABLET_KEY, JSON.stringify(isEnabled));
  }

  isLargeListTextTabletEnabled(): boolean {
    const item = localStorage.getItem(this.LARGE_LIST_TEXT_TABLET_KEY);
    return item ? JSON.parse(item) : false;
  }

  setLargeListTextTabletEnabled(isEnabled: boolean): void {
    localStorage.setItem(this.LARGE_LIST_TEXT_TABLET_KEY, JSON.stringify(isEnabled));
  }
}
