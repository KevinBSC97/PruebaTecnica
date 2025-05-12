import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalistaComponent } from './analista.component';
import { HistorialSolicitudesComponent } from './historial-solicitudes/historial-solicitudes.component';
import { DetalleSolicitudComponent } from './detalle-solicitud/detalle-solicitud.component';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: AnalistaComponent,
    children: [
      { path: '', redirectTo: 'historial-solicitudes', pathMatch: 'full' },
      { path: 'historial-solicitudes', component: HistorialSolicitudesComponent },
      { path: 'detalle-solicitud', component: DetalleSolicitudComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalistaRoutingModule { }
