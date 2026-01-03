import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { ComponentsModule } from './components/components.module';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'coroapp-ad7af',
        appId: '1:832424820791:web:244edfff73098996357fb2',
        storageBucket: 'coroapp-ad7af.appspot.com',
        apiKey: 'AIzaSyAeBRU2OFNoRvcUWtltnjawJ38Gxnj0NRY',
        authDomain: 'coroapp-ad7af.firebaseapp.com',
        messagingSenderId: '832424820791',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    ComponentsModule,
    FileOpener
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
