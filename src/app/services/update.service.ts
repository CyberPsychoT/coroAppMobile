import { Injectable } from '@angular/core';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { APP_CONFIG } from '../version';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(
    private firestore: Firestore,
    private alertController: AlertController,
    private platform: Platform,
    private toastController: ToastController,
    private http: HttpClient,
    private loadingController: LoadingController,
    private fileOpener: FileOpener
  ) { }

  checkForUpdates(manual: boolean = false) {
    this.platform.ready().then(() => {
      const currentBuild = APP_CONFIG.build_number;
      console.log('Current Build Number (Manual):', currentBuild);
      
      const appDocRef = doc(this.firestore, 'parametros/app_android');
      docData(appDocRef).subscribe((data: any) => {
        console.log('Firestore Data:', data);
        if (data && data.build_number > currentBuild) {
          console.log('Update available!');
          this.presentUpdateAlert(data);
        } else {
          console.log('No update available. Remote build:', data?.build_number, 'Local build:', currentBuild);
          if (manual) {
            this.presentToast('No hay actualizaciones disponibles');
          }
        }
      });
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  async presentUpdateAlert(data: any) {
    const alert = await this.alertController.create({
      header: 'Nueva Actualización Disponible',
      message: data.mensaje || 'Hay una nueva versión disponible. Por favor actualiza para continuar.',
      backdropDismiss: !data.obligatoria,
      buttons: [
        {
          text: 'Actualizar',
          handler: () => {
            this.downloadAndInstall(data.url_descarga);
            return false;
          }
        },
        ...(data.obligatoria ? [] : [{
          text: 'Más tarde',
          role: 'cancel'
        }])
      ]
    });

    await alert.present();
  }

  async downloadAndInstall(url: string) {
    const loading = await this.loadingController.create({
      message: 'Descargando actualización: 0%',
      backdropDismiss: false
    });
    await loading.present();

    this.http.get(url, { 
      responseType: 'blob',
      reportProgress: true,
      observe: 'events' 
    }).subscribe({
      next: async (event: any) => {
        if (event.type === HttpEventType.DownloadProgress) {
          const percentDone = Math.round(100 * event.loaded / (event.total || 1));
          loading.message = `Descargando actualización: ${percentDone}%`;
        } else if (event.type === HttpEventType.Response) {
          loading.dismiss();
          await this.saveAndOpenApk(event.body);
        }
      },
      error: async (err) => {
        loading.dismiss();
        console.error('Download error:', err);
        const alert = await this.alertController.create({
          header: 'Error en la descarga',
          message: `Hubo un problema descargando la actualización: ${JSON.stringify(err)}`,
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }

  async saveAndOpenApk(blob: Blob) {
    const fileName = 'update.apk';
    
    try {
      // Convert Blob to Base64
      const base64Data = await this.blobToBase64(blob);

      // Write file to cache directory
      const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Cache
      });

      console.log('File saved:', savedFile.uri);

      // Open the APK
      await this.fileOpener.open(savedFile.uri, 'application/vnd.android.package-archive');

    } catch (error) {
      console.error('Error saving or opening APK:', error);
      this.presentToast('Error al abrir el instalador.');
    }
  }

  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result.split(',')[1]); // Remove data:application/octet-stream;base64, prefix
        } else {
          reject('Failed to convert blob to base64');
        }
      };
      reader.readAsDataURL(blob);
    });
  }
}

