import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder){
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmarPassword: ['', Validators.required]
    }, {
      validators: this.validatePassword
    });
  }

  validatePassword(group: FormGroup){
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmedPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { nombre, email, password } = this.registerForm.value;

      console.log('Registrando usuario:', { nombre, email, password });

      alert('Registro exitoso. Ahora puedes iniciar sesión.');
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
