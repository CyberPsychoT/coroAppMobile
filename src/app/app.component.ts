import { Component } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { MenuController, ToastController } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Canciones', url: 'guess/songs', icon: 'musical-notes' },
    { title: 'Lista semanal', url: 'guess/list-week', icon: 'list' },
    { title: 'Configuración', url: 'guess/settings', icon: 'settings' },
  ];
  constructor(
    private router: Router,
    private menu: MenuController,
    private toastController: ToastController,
    public authService: AuthService,
    private configService: ConfigService,
  ) {
    this.applyStoredConfigurations();
  }

  //Aplicacion configuración
  //Texto grande
  private applyStoredConfigurations() {
    // Apply large text configuration for Celular
    if (this.configService.isLargeSongTextEnabled1()) {
      document.body.classList.add('large-song-text-1');
    }

    // Apply large list text configuration for Celular
    if (this.configService.isLargeListTextEnabled1()) {
      document.body.classList.add('large-list-text-1');
    }

    // Apply large text configuration for Celular (2)
    if (this.configService.isLargeSongTextEnabled2()) {
      document.body.classList.add('large-song-text-2');
    }

    // Apply large list text configuration for Celular (2)
    if (this.configService.isLargeListTextEnabled2()) {
      document.body.classList.add('large-list-text-2');
    }

    // Apply large text configuration for Tablet
    if (this.configService.isLargeSongTextTabletEnabled1()) {
      document.body.classList.add('large-song-text-tablet-1');
    }

    // Apply large list text configuration for Tablet
    if (this.configService.isLargeListTextTabletEnabled1()) {
      document.body.classList.add('large-list-text-tablet-1');
    }

    // Apply large text configuration for Tablet (2)
    if (this.configService.isLargeSongTextTabletEnabled2()) {
      document.body.classList.add('large-song-text-tablet-2');
    }

    // Apply large list text configuration for Tablet (2)
    if (this.configService.isLargeListTextTabletEnabled2()) {
      document.body.classList.add('large-list-text-tablet-2');
    }
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.menu.enable(false, 'main-menu');
    return true;
  }

  //Toast
  async presentToast(message: string, position: 'bottom', color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: position,
      color: color,
    });

    await toast.present();
  }

  logouth() {
    this.authService
      .logout()
      .then(() => {
        this.presentToast('Sesion finalizada correctamente', 'bottom', 'dark');
        this.router.navigate(['auth/landing']);
      })
      .catch((error) => console.log(error));
  }
}
