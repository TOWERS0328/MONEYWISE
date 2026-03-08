import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  async tomarFoto(): Promise<string | null> {

    try {

      const image = await Camera.getPhoto({
        quality: 40,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });

      return image.dataUrl || null;

    } catch (error) {
      console.error('Error cámara', error);
      return null;
    }

  }

  async seleccionarDeGaleria(): Promise<string | null> {

    try {

      const image = await Camera.getPhoto({
        quality: 70,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos
      });

      return image.dataUrl || null;

    } catch (error) {
      console.error('Error galería', error);
      return null;
    }

  }

}
