import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Credito } from 'src/app/interfaces/credito.interface';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DetalleSolicitudComponent } from '../detalle-solicitud/detalle-solicitud.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreditoService } from 'src/app/services/credito.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-historial-solicitudes',
  templateUrl: './historial-solicitudes.component.html',
  styleUrls: ['./historial-solicitudes.component.css']
})
export class HistorialSolicitudesComponent implements OnInit {
  solicitudes: Credito[] = [];

  constructor(private solicitudesService: SolicitudesService, private messageService: MessageService, private dialogService: DialogService, private creditoService: CreditoService) {}

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  cargarSolicitudes(){
    this.solicitudesService.getSolicitudes().subscribe({
      next: (data) => {
        this.solicitudes = data;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar las solicitudes',
          life: 3000
        });
      }
    });
  }

  verDetalle(id: number){
    this.creditoService.obtenerDetalleSolicitud(id).subscribe({
      next: (solicitud) => {
        const ref = this.dialogService.open(DetalleSolicitudComponent, {
          header: `Detalle de solicitud #${id}`,
          width: '60%',
          data: {solicitud}
        });
        ref.onClose.subscribe((refrescar: boolean) => {
          if(refrescar) this.cargarSolicitudes();
        })
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo obtener el detalle de la solicitud',
          life: 3000
        });
      }
    })
  }

  cambiarEstado(id: number, estado: 'APROBADO' | 'RECHAZADO') {
    this.solicitudesService.cambiarEstado(id, estado).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Estado actualizado',
          detail: `Solicitud #${id} fue ${estado.toLowerCase()}`,
          life: 3000
        });
        this.cargarSolicitudes();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo actualizar el estado',
          life: 3000
        });
      }
    });
  }

  abrirDialogoRechazo(id: number){
    const ref = this.dialogService.open(RechazoInlineComponent, {
      header: 'Motivo de Rechazo',
      width: '400px',
      data: { idCredito: id }
    });

    ref.onClose.subscribe((observacion: string | undefined) => {
      if (observacion) {
        this.solicitudesService.cambiarEstado(id, 'RECHAZADO', observacion).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Rechazada', detail: 'Solicitud rechazada correctamente' });
            this.cargarSolicitudes();
          }
        });
      }
    });
  }

  descargarPDF() {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('Historial de Solicitudes', 14, 15);

    const filas = this.solicitudes.map(s => [
      `${s.monto.toFixed(2)} USD`,
      `${s.plazo} meses`,
      `${s.tasaInteres}%`,
      `${s.estado}`,
      new Date(s.fechaSolicitud).toLocaleDateString()
    ]);

    autoTable(doc, {
      head: [['Monto', 'Plazo', 'Interés', 'Estado', 'Fecha']],
      body: filas,
      startY: 20
    });

    doc.save('historial_solicitudes.pdf');
  }
}

@Component({
  selector: 'app-rechazo-inline',
  template: `
    <form [formGroup]="form">
      <div class="p-fluid">
        <label for="observacion">Observación:</label>
        <textarea
          id="observacion"
          formControlName="observacion"
          rows="5"
          class="p-inputtext p-fluid"
        ></textarea>

        <div class="p-d-flex p-jc-end mt-3">
          <button pButton label="Cancelar" class="p-button-text" (click)="cerrar()"></button>
          <button pButton label="Confirmar" (click)="confirmar()" [disabled]="form.invalid"></button>
        </div>
      </div>
    </form>
  `
})
export class RechazoInlineComponent implements OnInit {
  form!: FormGroup;

  constructor(
    public ref: DynamicDialogRef,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      observacion: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  confirmar(): void {
    if (this.form.valid) {
      this.ref.close(this.form.value.observacion);
    }
  }

  cerrar(): void {
    this.ref.close();
  }
}
