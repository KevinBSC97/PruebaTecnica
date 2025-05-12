import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private messageService: MessageService){
  }

  ngOnInit(){
    this.registerForm = this.fb.group({
      identificacion: ['', Validators.required, Validators.pattern(/^\d{10}$/)],
      nombre: ['', Validators.required, Validators.pattern(/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/)],
      apellido: ['', Validators.required, Validators.pattern(/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/)],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmarPassword: ['', Validators.required]
    }, {
      validators: this.validatePassword
    });
  }

  validatePassword(group: FormGroup){
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmarPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  soloNumeros(event: KeyboardEvent){
    const charCode = event.key;

    if (!/^\d$/.test(charCode)) {
      event.preventDefault(); // bloquea letras y símbolos
    }
  }

  soloLetras(event: KeyboardEvent) {
    const inputChar = String.fromCharCode(event.keyCode);
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(inputChar)) {
      event.preventDefault();
    }
  }

  onSubmit() {
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      return;
    }

    const { identificacion, nombre, apellido, email, password } = this.registerForm.value;

    this.authService.register({ identificacion, nombre, apellido, email, password }).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Registro exitoso',
          detail: 'Registro exitoso',
          life: 3000
        });
        setTimeout(() => {
          this.router.navigate(['/auth/login'])
        }, 1000);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo completar el registro',
          life: 3000
        });
      }
    });
  }
}
