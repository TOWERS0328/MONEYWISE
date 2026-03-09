import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Importar ChangeDetectorRef
import { User } from 'src/app/core/model/user.model';
import { AuthService } from 'src/app/core/services/auth';
import { ActionSheetController, NavController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false
})
export class PerfilPage implements OnInit {

  usuario: User | null = null;

  constructor(
    private auth: AuthService,
    private actionSheetCtrl: ActionSheetController,
    private navCtrl: NavController,
    private cdr: ChangeDetectorRef // 2. Inyectar ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.auth.currentUser$.subscribe(user => {
      this.usuario = user || null;
    });
  }

  async cambiarFoto() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Seleccionar Foto de Perfil',
      buttons: [
        {
          text: 'Cámara',
          icon: 'camera-outline',
          handler: () => { this.tomarFoto(CameraSource.Camera); }
        },
        {
          text: 'Galería',
          icon: 'image-outline',
          handler: () => { this.tomarFoto(CameraSource.Photos); }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  async tomarFoto(source: CameraSource) {
  try {
    const image = await Camera.getPhoto({
      quality: 50, // Calidad optimizada para almacenamiento local
      allowEditing: true,
      resultType: CameraResultType.DataUrl, // Importante: Guarda el contenido real de la imagen
      source: source
    });

    if (image.dataUrl && this.usuario) {
      const fotoBase64 = image.dataUrl;

      // 1. Actualización visual inmediata
      this.usuario.foto = fotoBase64;
      this.cdr.detectChanges();

      // 2. Persistencia real
      // Usamos el método que actualiza tanto la lista global como la sesión actual
      this.auth.updateUserProfile({ foto: fotoBase64 });

      console.log('Foto de perfil persistida con éxito');
    }
  } catch (error) {
    console.error('Error al obtener la foto', error);
  }
}

  handleLogout() {
    this.auth.logout();
    this.navCtrl.navigateRoot('/auth/login');
  }
}
