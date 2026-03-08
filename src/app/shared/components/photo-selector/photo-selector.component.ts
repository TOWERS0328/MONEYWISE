import { Component, EventEmitter, Output } from '@angular/core';
import { CameraService } from 'src/app/core/services/camera';

@Component({
  selector: 'app-photo-selector',
  templateUrl: './photo-selector.component.html',
  styleUrls: ['./photo-selector.component.scss'],
  standalone: false,
})
export class PhotoSelectorComponent {

  foto: string | null = null;

  @Output() fotoChange = new EventEmitter<string | null>();

  constructor(private cameraService: CameraService) {}

  async tomarFoto() {

    const img = await this.cameraService.tomarFoto();

    if(img){
      this.foto = img;
      this.fotoChange.emit(img);
    }

  }

  async galeria(){

    const img = await this.cameraService.seleccionarDeGaleria();

    if(img){
      this.foto = img;
      this.fotoChange.emit(img);
    }

  }

  eliminar(){

    this.foto = null;
    this.fotoChange.emit(null);

  }

}