import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NavBarService } from 'src/app/services/nav-bar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnDestroy {
  title = '';
  color = '';
  subscriptions: Subscription = new Subscription();

  constructor(
    private location: Location,
    private navbarService: NavBarService,
    public authService: AuthService,
    private modalController: ModalController,
    private router: Router
  ) {
    this.subscriptions.add(
      this.navbarService.currentTitle.subscribe((title) => {
        this.title = title;
      })
    );

    this.subscriptions.add(
      this.navbarService.currentColor.subscribe((color) => {
        this.color = color;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  goToBack() {
    this.location.back();
  }
}
