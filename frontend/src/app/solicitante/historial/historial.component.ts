import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CreditoService } from 'src/app/services/credito.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  mostrarModal = false;
  solicitudes: any[] = [];

  constructor(private creditoService: CreditoService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.obtenerSolicitudes();
  }

  obtenerSolicitudes(){
    this.creditoService.obtenerSolicitudesUsuario().subscribe({
      next: (data) => {
        this.solicitudes = data;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar las solicitudes'
        });
      }
    });
  }

  abrirModal(){
    this.mostrarModal = true;
  }

  cerrarModal(){
    this.mostrarModal = false;
  }

  onSolicitudCreada(){
    this.obtenerSolicitudes();
  }
}
