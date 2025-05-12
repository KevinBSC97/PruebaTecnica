import { Component, OnInit } from '@angular/core';
import { Notificacion } from 'src/app/interfaces/notificacion.interface';
import { NotificacionService } from 'src/app/services/notificacion.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {
  notificaciones: Notificacion[] = [];
  mostrarPanel = false;

  constructor(private notificacionService: NotificacionService) {}

  ngOnInit(): void {
    this.cargarNotificaciones();
  }

  cargarNotificaciones(){
    this.notificacionService.obtenerNotificaciones().subscribe((res) => {
      this.notificaciones = res;
    });
  }

  marcarComoLeida(id: number){
    this.notificacionService.marcarComoLeida(id).subscribe({
      next: () => {
        console.log(`Notificación ${id}`);
        this.notificaciones = this.notificaciones.filter(n => n.notificacionId !== id);
      },
      error: (err) => {
        console.log(`error ${id}`);
      }
    })
  }

  togglePanel(){
    this.mostrarPanel = !this.mostrarPanel;
  }
}
