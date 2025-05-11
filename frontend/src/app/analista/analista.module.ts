import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalistaRoutingModule } from './analista-routing.module';
import { AnalistaComponent } from './analista.component';
import { HistorialSolicitudesComponent } from './historial-solicitudes/historial-solicitudes.component';
import { DetalleSolicitudComponent } from './detalle-solicitud/detalle-solicitud.component';
import { SharedModule } from '../shared/shared.module';

import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogService } from 'primeng/dynamicdialog';


@NgModule({
  declarations: [
    AnalistaComponent,
    HistorialSolicitudesComponent,
    DetalleSolicitudComponent
  ],
  imports: [
    CommonModule,
    AnalistaRoutingModule,
    SharedModule,
    DynamicDialogModule
  ],
  providers: [DialogService]
})
export class AnalistaModule { }
