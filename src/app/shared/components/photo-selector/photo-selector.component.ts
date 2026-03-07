import { Component, EventEmitter, Output } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { IonCard, IonCardContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-photo-selector',
  templateUrl: './photo-selector.component.html',
  styleUrls: ['./photo-selector.component.scss'],
  standalone:false
})
export class PhotoSelectorComponent {

  foto: string | null = null;

  @Output() fotoChange = new EventEmitter<string | null>();

  constructor() {}

  async tomarFoto() {

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    this.foto = image.dataUrl!;
    this.fotoChange.emit(this.foto);

  }

  async seleccionarFoto() {

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos
    });

    this.foto = image.dataUrl!;
    this.fotoChange.emit(this.foto);

  }

  eliminarFoto() {
    this.foto = null;
    this.fotoChange.emit(null);
  }

}
