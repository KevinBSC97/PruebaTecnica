import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CreditoCreateDTO } from 'src/app/interfaces/creditoCreate.interface';
import { CreditoService } from 'src/app/services/credito.service';

@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.css']
})
export class CrearSolicitudComponent implements OnInit {
  @Input() mostrarModal: boolean = false;
  @Output() modalCerrado = new EventEmitter<void>();
  @Output() solicitudCread = new EventEmitter<void>();

  formSolicitud!: FormGroup;

  constructor(private fb: FormBuilder, private creditoService: CreditoService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.formSolicitud = this.fb.group({
      monto: [null, [Validators.required, Validators.min(2000), Validators.max(100000)]],
      plazo: [null, [Validators.required, Validators.min(6), Validators.max(60)]],
      tasaInteres: [null, [Validators.required, Validators.min(0.1), Validators.max(100)]],
      ingresoMensual: [null, [Validators.required, Validators.min(1)]],
      antiguedadLaboral: [null, [Validators.required, Validators.min(0)]],
      relacionDependencia: [null, [Validators.required, Validators.minLength(3)]],
    });
  }

  crearSolicitud(){
    if(this.formSolicitud.invalid){
      this.formSolicitud.markAllAsTouched();
      return;
    }

    const dto: CreditoCreateDTO = this.formSolicitud.value;

    this.creditoService.crearSolicitud(dto).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Solicitud creada',
          detail: 'Tu solicitud fue enviada exitosamente',
          life: 3000
        });

        this.formSolicitud.reset();
        this.modalCerrado.emit();
        this.solicitudCread.emit();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ocurrió un problema al crear la solicitud',
          life: 3000
        });
      }
    });
  }

  cerrarModal(){
    this.modalCerrado.emit();
  }
}
