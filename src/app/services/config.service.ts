import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private LARGE_SONG_TEXT_KEY_1 = 'largeSongTextEnabled1'; // Para canciones Celular
  private LARGE_LIST_TEXT_KEY_1 = 'largeListTextEnabled1'; // Para listas Celular
  private LARGE_SONG_TEXT_KEY_2 = 'largeSongTextEnabled2'; // Para canciones Celular
  private LARGE_LIST_TEXT_KEY_2 = 'largeListTextEnabled2'; // Para listas Celular

  private LARGE_SONG_TEXT_TABLET_KEY_1 = 'largeSongTextTabletEnabled1'; // Para canciones Tablet
  private LARGE_LIST_TEXT_TABLET_KEY_1 = 'largeListTextTabletEnabled1'; // Para listas Tablet
  private LARGE_SONG_TEXT_TABLET_KEY_2 = 'largeSongTextTabletEnabled2'; // Para canciones Tablet
  private LARGE_LIST_TEXT_TABLET_KEY_2 = 'largeListTextTabletEnabled2'; // Para listas Tablet

  constructor() {}

  // Canciones aumentar texto Celular
  isLargeSongTextEnabled1(): boolean {
    const item = localStorage.getItem(this.LARGE_SONG_TEXT_KEY_1);
    return item ? JSON.parse(item) : false;
  }

  setLargeSongTextEnabled1(isEnabled: boolean): void {
    localStorage.setItem(this.LARGE_SONG_TEXT_KEY_1, JSON.stringify(isEnabled));
  }

  isLargeListTextEnabled1(): boolean {
    const item = localStorage.getItem(this.LARGE_LIST_TEXT_KEY_1);
    return item ? JSON.parse(item) : false;
  }

  setLargeListTextEnabled1(isEnabled: boolean): void {
    localStorage.setItem(this.LARGE_LIST_TEXT_KEY_1, JSON.stringify(isEnabled));
  }

  isLargeSongTextEnabled2(): boolean {
    const item = localStorage.getItem(this.LARGE_SONG_TEXT_KEY_2);
    return item ? JSON.parse(item) : false;
  }

  setLargeSongTextEnabled2(isEnabled: boolean): void {
    localStorage.setItem(this.LARGE_SONG_TEXT_KEY_2, JSON.stringify(isEnabled));
  }

  isLargeListTextEnabled2(): boolean {
    const item = localStorage.getItem(this.LARGE_LIST_TEXT_KEY_2);
    return item ? JSON.parse(item) : false;
  }

  setLargeListTextEnabled2(isEnabled: boolean): void {
    localStorage.setItem(this.LARGE_LIST_TEXT_KEY_2, JSON.stringify(isEnabled));
  }

  // Canciones aumentar texto Tablet
  isLargeSongTextTabletEnabled1(): boolean {
    const item = localStorage.getItem(this.LARGE_SONG_TEXT_TABLET_KEY_1);
    return item ? JSON.parse(item) : false;
  }

  setLargeSongTextTabletEnabled1(isEnabled: boolean): void {
    localStorage.setItem(this.LARGE_SONG_TEXT_TABLET_KEY_1, JSON.stringify(isEnabled));
  }

  isLargeListTextTabletEnabled1(): boolean {
    const item = localStorage.getItem(this.LARGE_LIST_TEXT_TABLET_KEY_1);
    return item ? JSON.parse(item) : false;
  }

  setLargeListTextTabletEnabled1(isEnabled: boolean): void {
    localStorage.setItem(this.LARGE_LIST_TEXT_TABLET_KEY_1, JSON.stringify(isEnabled));
  }

  isLargeSongTextTabletEnabled2(): boolean {
    const item = localStorage.getItem(this.LARGE_SONG_TEXT_TABLET_KEY_2);
    return item ? JSON.parse(item) : false;
  }

  setLargeSongTextTabletEnabled2(isEnabled: boolean): void {
    localStorage.setItem(this.LARGE_SONG_TEXT_TABLET_KEY_2, JSON.stringify(isEnabled));
  }

  isLargeListTextTabletEnabled2(): boolean {
    const item = localStorage.getItem(this.LARGE_LIST_TEXT_TABLET_KEY_2);
    return item ? JSON.parse(item) : false;
  }

  setLargeListTextTabletEnabled2(isEnabled: boolean): void {
    localStorage.setItem(this.LARGE_LIST_TEXT_TABLET_KEY_2, JSON.stringify(isEnabled));
  }
}
