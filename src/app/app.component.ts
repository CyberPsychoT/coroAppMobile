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
    public authService: AuthService
  ) {}

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
