import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { NavBarService } from 'src/app/services/nav-bar.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  // Segmento de las categorías
  selectedSegment: string = 'celular';
  largeSongTextEnabled1: boolean = false; // Texto de las canciones para celular
  largeListTextEnabled1: boolean = false; // Texto de las listas para celular
  largeSongTextEnabled2: boolean = false; // Texto de las canciones para celular
  largeListTextEnabled2: boolean = false; // Texto de las listas para celular

  largeSongTextTabletEnabled1: boolean = false; // Texto de canciones para tablet
  largeListTextTabletEnabled1: boolean = false; // Texto de listas para tablet
  largeSongTextTabletEnabled2: boolean = false; // Texto de canciones para tablet
  largeListTextTabletEnabled2: boolean = false; // Texto de listas para tablet

  constructor(
    private navbarService: NavBarService,
    private configService: ConfigService
  ) {}

  ngOnInit() {
    this.navbarService.setTitle('Configuración'); // Título de la página
    this.navbarService.setColor('dark'); // Color del navbar
    this.largeSongTextEnabled1 = this.configService.isLargeSongTextEnabled1(); // Texto grande para canciones
    this.largeListTextEnabled1 = this.configService.isLargeListTextEnabled1(); // Texto grande para listas
    this.largeSongTextEnabled2 = this.configService.isLargeSongTextEnabled2(); // Texto grande para canciones
    this.largeListTextEnabled2 = this.configService.isLargeListTextEnabled2(); // Texto grande para listas

    this.largeSongTextTabletEnabled1 = this.configService.isLargeSongTextTabletEnabled1(); // Texto song tablet
    this.largeListTextTabletEnabled1 = this.configService.isLargeListTextTabletEnabled1(); // Texto lista tablet
    this.largeSongTextTabletEnabled2 = this.configService.isLargeSongTextTabletEnabled2(); // Texto song tablet
    this.largeListTextTabletEnabled2 = this.configService.isLargeListTextTabletEnabled2(); // Texto lista tablet
  }

  onLargeSongTextToggleChange1() {
    if (this.largeSongTextEnabled1) {
      this.largeSongTextEnabled2 = false;
      this.largeSongTextTabletEnabled1 = false;
      this.largeSongTextTabletEnabled2 = false;
      document.body.classList.remove('large-song-text-2', 'large-song-text-tablet-1', 'large-song-text-tablet-2');
      this.configService.setLargeSongTextEnabled2(false);
      this.configService.setLargeSongTextTabletEnabled1(false);
      this.configService.setLargeSongTextTabletEnabled2(false);
    }
    this.configService.setLargeSongTextEnabled1(this.largeSongTextEnabled1);
    document.body.classList.toggle('large-song-text-1', this.largeSongTextEnabled1);
  }

  onLargeListTextToggleChange1() {
    if (this.largeListTextEnabled1) {
      this.largeListTextEnabled2 = false;
      this.largeListTextTabletEnabled1 = false;
      this.largeListTextTabletEnabled2 = false;
      document.body.classList.remove('large-list-text-2', 'large-list-text-tablet-1', 'large-list-text-tablet-2');
      this.configService.setLargeListTextEnabled2(false);
      this.configService.setLargeListTextTabletEnabled1(false);
      this.configService.setLargeListTextTabletEnabled2(false);
    }
    this.configService.setLargeListTextEnabled1(this.largeListTextEnabled1);
    document.body.classList.toggle('large-list-text-1', this.largeListTextEnabled1);
  }

  onLargeSongTextToggleChange2() {
    if (this.largeSongTextEnabled2) {
      this.largeSongTextEnabled1 = false;
      this.largeSongTextTabletEnabled1 = false;
      this.largeSongTextTabletEnabled2 = false;
      document.body.classList.remove('large-song-text-1', 'large-song-text-tablet-1', 'large-song-text-tablet-2');
      this.configService.setLargeSongTextEnabled1(false);
      this.configService.setLargeSongTextTabletEnabled1(false);
      this.configService.setLargeSongTextTabletEnabled2(false);
    }
    this.configService.setLargeSongTextEnabled2(this.largeSongTextEnabled2);
    document.body.classList.toggle('large-song-text-2', this.largeSongTextEnabled2);
  }

  onLargeListTextToggleChange2() {
    if (this.largeListTextEnabled2) {
      this.largeListTextEnabled1 = false;
      this.largeListTextTabletEnabled1 = false;
      this.largeListTextTabletEnabled2 = false;
      document.body.classList.remove('large-list-text-1', 'large-list-text-tablet-1', 'large-list-text-tablet-2');
      this.configService.setLargeListTextEnabled1(false);
      this.configService.setLargeListTextTabletEnabled1(false);
      this.configService.setLargeListTextTabletEnabled2(false);
    }
    this.configService.setLargeListTextEnabled2(this.largeListTextEnabled2);
    document.body.classList.toggle('large-list-text-2', this.largeListTextEnabled2);
  }

  onLargeSongTextTabletToggleChange1() {
    if (this.largeSongTextTabletEnabled1) {
      this.largeSongTextEnabled1 = false;
      this.largeSongTextEnabled2 = false;
      this.largeSongTextTabletEnabled2 = false;
      document.body.classList.remove('large-song-text-1', 'large-song-text-2', 'large-song-text-tablet-2');
      this.configService.setLargeSongTextEnabled1(false);
      this.configService.setLargeSongTextEnabled2(false);
      this.configService.setLargeSongTextTabletEnabled2(false);
    }
    this.configService.setLargeSongTextTabletEnabled1(this.largeSongTextTabletEnabled1);
    document.body.classList.toggle('large-song-text-tablet-1', this.largeSongTextTabletEnabled1);
  }

  onLargeListTextTabletToggleChange1() {
    if (this.largeListTextTabletEnabled1) {
      this.largeListTextEnabled1 = false;
      this.largeListTextEnabled2 = false;
      this.largeListTextTabletEnabled2 = false;
      document.body.classList.remove('large-list-text-1', 'large-list-text-2', 'large-list-text-tablet-2');
      this.configService.setLargeListTextEnabled1(false);
      this.configService.setLargeListTextEnabled2(false);
      this.configService.setLargeListTextTabletEnabled2(false);
    }
    this.configService.setLargeListTextTabletEnabled1(this.largeListTextTabletEnabled1);
    document.body.classList.toggle('large-list-text-tablet-1', this.largeListTextTabletEnabled1);
  }

  onLargeSongTextTabletToggleChange2() {
    if (this.largeSongTextTabletEnabled2) {
      this.largeSongTextEnabled1 = false;
      this.largeSongTextEnabled2 = false;
      this.largeSongTextTabletEnabled1 = false;
      document.body.classList.remove('large-song-text-1', 'large-song-text-2', 'large-song-text-tablet-1');
      this.configService.setLargeSongTextEnabled1(false);
      this.configService.setLargeSongTextEnabled2(false);
      this.configService.setLargeSongTextTabletEnabled1(false);
    }
    this.configService.setLargeSongTextTabletEnabled2(this.largeSongTextTabletEnabled2);
    document.body.classList.toggle('large-song-text-tablet-2', this.largeSongTextTabletEnabled2);
  }

  onLargeListTextTabletToggleChange2() {
    if (this.largeListTextTabletEnabled2) {
      this.largeListTextEnabled1 = false;
      this.largeListTextEnabled2 = false;
      this.largeListTextTabletEnabled1 = false;
      document.body.classList.remove('large-list-text-1', 'large-list-text-2', 'large-list-text-tablet-1');
      this.configService.setLargeListTextEnabled1(false);
      this.configService.setLargeListTextEnabled2(false);
      this.configService.setLargeListTextTabletEnabled1(false);
    }
    this.configService.setLargeListTextTabletEnabled2(this.largeListTextTabletEnabled2);
    document.body.classList.toggle('large-list-text-tablet-2', this.largeListTextTabletEnabled2);
  }
}
