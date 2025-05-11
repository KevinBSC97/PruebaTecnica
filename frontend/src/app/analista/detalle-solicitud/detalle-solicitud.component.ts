import { Component } from '@angular/core';
import { Credito } from 'src/app/interfaces/credito.interface';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-detalle-solicitud',
  templateUrl: './detalle-solicitud.component.html',
  styleUrls: ['./detalle-solicitud.component.css']
})
export class DetalleSolicitudComponent {
  solicitud: Credito;

  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig) {
    this.solicitud = this.config.data.solicitud;
  }

  cerrar(){
    this.ref.close();
  }
}
