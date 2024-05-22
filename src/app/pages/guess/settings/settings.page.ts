import { Component, OnInit } from '@angular/core';
import { NavBarService } from 'src/app/services/nav-bar.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  constructor(private navbarService: NavBarService) {}

  ngOnInit() {
    this.navbarService.setTitle('Configuración'); //titulo de la pagina
    this.navbarService.setColor('primary'); //Color del navbar
  }
}
