import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { CreditoCreateDTO } from "../interfaces/creditoCreate.interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class CreditoService{
  private api = environment.apiUrl;

  constructor(private http: HttpClient){}

  crearSolicitud(dto: CreditoCreateDTO): Observable<any>{
    return this.http.post(`${this.api}Solicitudes/crear-solicitud`, dto);
  }

  obtenerSolicitudesUsuario(): Observable<any[]>{
    return this.http.get<any[]>(`${this.api}Solicitudes`);
  }

  obtenerDetalleSolicitud(id: number): Observable<any>{
    return this.http.get(`${this.api}Credito/${id}`);
  }
}
