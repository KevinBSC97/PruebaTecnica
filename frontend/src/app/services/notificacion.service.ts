import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Notificacion } from "../interfaces/notificacion.interface";

@Injectable({ providedIn: 'root'})
export class NotificacionService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  obtenerNotificaciones(): Observable<Notificacion[]>{
    return this.http.get<Notificacion[]>(`${this.api}Notificaciones`);
  }

  marcarComoLeida(id: number): Observable<any>{
    return this.http.put(`${this.api}Notificaciones/marcar/${id}`, {});
  }
}
