import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import {
  NoSideMenuGuard,
  ReactivateMenuGuard,
} from './guards/no-side-menu.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: 'landing',
    loadChildren: () =>
      import('./pages/auth/landing/landing.module').then(
        (m) => m.LandingPageModule
      ),
    canActivate: [NoSideMenuGuard],
  },
  {
    path: 'auth/login',
    loadChildren: () =>
      import('./pages/auth/login/login.module').then((m) => m.LoginPageModule),
    canActivate: [NoSideMenuGuard],
  },
  {
    path: 'guess/songs',
    loadChildren: () =>
      import('./pages/guess/songs/songs.module').then((m) => m.SongsPageModule),
    canActivate: [ReactivateMenuGuard],
  },
  {
    path: 'guess/list-week',
    loadChildren: () =>
      import('./pages/guess/list-week/list-week.module').then(
        (m) => m.ListWeekPageModule
      ),
  },
  {
    path: 'guess/settings',
    loadChildren: () =>
      import('./pages/guess/settings/settings.module').then(
        (m) => m.SettingsPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
