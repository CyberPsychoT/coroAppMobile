import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { NavBarService } from 'src/app/services/nav-bar.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  //Segmento de las categorias
  selectedSegment: string = 'celular';
  largeTextEnabled: boolean = false; //Texto de las canciones para celular
  largeListTextEnabled: boolean = false; //Texto de las listas para celular
  largeTextTabletEnabled: boolean = false; //TExto de canciones para tablet
  largeListTextTabletEnabled: boolean = false; //Texto de lista para tablet

  constructor(
    private navbarService: NavBarService,
    private configService: ConfigService
  ) {}

  ngOnInit() {
    this.navbarService.setTitle('Configuración'); //titulo de la pagina
    this.navbarService.setColor('primary'); //Color del navbar
    this.largeTextEnabled = this.configService.isLargeTextEnabled(); //Texto grande para canciones
    this.largeListTextEnabled = this.configService.isLargeListTextEnabled(); // Texto grande para listas
    this.largeTextTabletEnabled = this.configService.isLargeTextTabletEnabled(); //Texto song tablet
    this.largeListTextTabletEnabled = this.configService.isLargeListTextTabletEnabled(); //Texto lista tablet
  }

//////////////////////////////
  onLargeTextToggleChange() {
    if (this.largeTextEnabled) {
      this.largeTextTabletEnabled = false;
      document.body.classList.remove('large-song-text-tablet');
      this.configService.setLargeTextTabletEnabled(false);
    }
    this.configService.setLargeTextEnabled(this.largeTextEnabled);
    document.body.classList.toggle('large-song-text', this.largeTextEnabled);
  }

  onLargeListTextToggleChange() {
    if (this.largeListTextEnabled) {
      this.largeListTextTabletEnabled = false;
      document.body.classList.remove('large-list-text-tablet');
      this.configService.setLargeListTextTabletEnabled(false);
    }
    this.configService.setLargeListTextEnabled(this.largeListTextEnabled);
    document.body.classList.toggle('large-list-text', this.largeListTextEnabled);
  }

  onLargeTextTabletToggleChange() {
    if (this.largeTextTabletEnabled) {
      this.largeTextEnabled = false;
      document.body.classList.remove('large-song-text');
      this.configService.setLargeTextEnabled(false);
    }
    this.configService.setLargeTextTabletEnabled(this.largeTextTabletEnabled);
    document.body.classList.toggle('large-song-text-tablet', this.largeTextTabletEnabled);
  }

  onLargeListTextTabletToggleChange() {
    if (this.largeListTextTabletEnabled) {
      this.largeListTextEnabled = false;
      document.body.classList.remove('large-list-text');
      this.configService.setLargeListTextEnabled(false);
    }
    this.configService.setLargeListTextTabletEnabled(this.largeListTextTabletEnabled);
    document.body.classList.toggle('large-list-text-tablet', this.largeListTextTabletEnabled);
  }
}
