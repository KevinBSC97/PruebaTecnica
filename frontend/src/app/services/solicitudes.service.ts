import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Credito } from "../interfaces/credito.interface";

@Injectable({ providedIn: 'root' })
export class SolicitudesService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getSolicitudes(): Observable<Credito[]>{
    return this.http.get<Credito[]>(`${this.api}Credito`);
  }

  getSolicitudesById(id: number): Observable<Credito>{
    return this.http.get<Credito>(`${this.api}Credito/${id}`);
  }

  cambiarEstado(id: number, estado: string, observacion?: string): Observable<any> {
    return this.http.put(`${this.api}Credito/${id}/estado`, {
      nuevoEstado: estado,
      observacion: observacion ?? null
    });
  }
}
