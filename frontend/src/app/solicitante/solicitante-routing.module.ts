import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitanteComponent } from './solicitante.component';
import { HistorialComponent } from './historial/historial.component';
import { CrearSolicitudComponent } from './crear-solicitud/crear-solicitud.component';

const routes: Routes = [
  {
    path: '',
    component: SolicitanteComponent,
    children: [
      { path: '', redirectTo: 'historial', pathMatch: 'full' },
      { path: 'historial', component: HistorialComponent },
      { path: 'crear', component: CrearSolicitudComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitanteRoutingModule { }
