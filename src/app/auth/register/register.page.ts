

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Auth } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router
  ) {

    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmar: ['', Validators.required]
    }, { validators: this.passwordsMatch });

  }

  passwordsMatch(control: AbstractControl) {

    const password = control.get('password')?.value;
    const confirmar = control.get('confirmar')?.value;

    return password === confirmar ? null : { noCoinciden: true };

  }

  async onRegistrar() {

    if (this.registerForm.invalid) {
      alert('Complete correctamente el formulario');
      this.registerForm.markAllAsTouched();
      return;
    }

    const { nombre, email, password } = this.registerForm.value;

    const success = await this.auth.register(nombre, email, password);

    if (success) {

      alert('Usuario registrado correctamente');

      this.router.navigate(['/auth/login']);

    } else {

      alert('El usuario ya existe');

    }

  }

  get f() {
    return this.registerForm.controls;
  }

}
