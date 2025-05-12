import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CreditoService } from 'src/app/services/credito.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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

  descargarPDF() {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('Historial de Solicitudes', 14, 15);

    const filas = this.solicitudes.map(s => [
      `${s.monto.toFixed(2)} USD`,
      `${s.plazo} meses`,
      `${s.tasaInteres}%`,
      `${s.estado}`,
      `${s.motivo}`,
      new Date(s.fechaSolicitud).toLocaleDateString()
    ]);

    autoTable(doc, {
      head: [['Monto', 'Plazo', 'Interés', 'Estado', 'Motivo', 'Fecha']],
      body: filas,
      startY: 20
    });

    doc.save('historial_solicitudes.pdf');
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
