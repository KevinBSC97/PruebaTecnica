import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Credito } from 'src/app/interfaces/credito.interface';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { DialogService } from 'primeng/dynamicdialog';
import { DetalleSolicitudComponent } from '../detalle-solicitud/detalle-solicitud.component';

@Component({
  selector: 'app-historial-solicitudes',
  templateUrl: './historial-solicitudes.component.html',
  styleUrls: ['./historial-solicitudes.component.css']
})
export class HistorialSolicitudesComponent implements OnInit {
  solicitudes: Credito[] = [];

  constructor(private solicitudesService: SolicitudesService, private router: Router, private messageService: MessageService, private dialogService: DialogService) {}

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
    const solicitud = this.solicitudes.find(s => s.idCredito === id);
    if(solicitud){
      this.dialogService.open(DetalleSolicitudComponent, {
        header: `Detalle de solicitud #${id}`,
        width: '60%',
        data: { solicitud }
      })
    }
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
      this.cargarSolicitudes(); // recargar la tabla
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
}
