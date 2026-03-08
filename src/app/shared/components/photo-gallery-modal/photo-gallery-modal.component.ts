import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-photo-gallery-modal',
  templateUrl: './photo-gallery-modal.component.html',
  styleUrls: ['./photo-gallery-modal.component.scss'],
  standalone: false,
})
export class PhotoGalleryModalComponent {

  @Input() fotos: string[] = [];

  @Input() fotoInicial = 0;

  constructor(private modalCtrl: ModalController) {}

  cerrar(){
    this.modalCtrl.dismiss();
  }

}
