import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth';
import { ToastService } from 'src/app/core/services/toast';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {

  registerForm: FormGroup; // ← era 'form'

  get f() {                // ← getter que necesita el HTML
    return this.registerForm.controls;
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    @Inject(ToastService) private toast: ToastService
  ){
    this.registerForm = this.fb.group({
      nombre:   ['', [Validators.required, Validators.minLength(2)]],
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmar:['', Validators.required]
    }, { validators: this.passwordsCoinciden });
  }

  passwordsCoinciden(group: AbstractControl): ValidationErrors | null {
    const pass      = group.get('password')?.value;
    const confirmar = group.get('confirmar')?.value;
    return pass === confirmar ? null : { noCoinciden: true };
  }

 onRegistrar() {
  if (this.registerForm.invalid) return;

  const { nombre, email, password } = this.registerForm.value;

  // Creamos el objeto cumpliendo con TODA la interfaz User
  const user = {
    id: crypto.randomUUID(),
    nombre,
    email,
    password,
    fechaRegistro: new Date(),
    foto: '',             // ← Agregado para cumplir la interfaz
    ultimoIngreso: Date.now() // ← Agregado para cumplir la interfaz
  };

  const success = this.authService.register(user);

  if (success) {
    this.router.navigate(['/tabs/dashboard']);
  } else {
    this.toast.show('El usuario ya existe', 'danger');
  }
}

  volverLogin(){
    this.router.navigate(['/auth/login']);
  }

}
