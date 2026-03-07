import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class CameraService {

  constructor() {}

  // Tomar foto con la cámara
  async takePicture(): Promise<string | undefined> {
    try {
      const image: Photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });

      return image.dataUrl;

    } catch (error) {
      console.error('Error al tomar la foto', error);
      return undefined;
    }
  }

  // Seleccionar imagen desde galería
  async pickFromGallery(): Promise<string | undefined> {
    try {
      const image: Photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos
      });

      return image.dataUrl;

    } catch (error) {
      console.error('Error al abrir galería', error);
      return undefined;
    }
  }

}
