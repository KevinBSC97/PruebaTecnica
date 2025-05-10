import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitanteRoutingModule } from './solicitante-routing.module';
import { SolicitanteComponent } from './solicitante.component';
import { CrearSolicitudComponent } from './crear-solicitud/crear-solicitud.component';
import { HistorialComponent } from './historial/historial.component';

import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    SolicitanteComponent,
    CrearSolicitudComponent,
    HistorialComponent
  ],
  imports: [
    CommonModule,
    SolicitanteRoutingModule,
    SharedModule
  ]
})
export class SolicitanteModule { }
