import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VigilanciaElectronicaService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  obtenerVigilaciaElectronica(): Observable<any> {
    const url = `${this.baseUrl}listVigilanciaElc`; 

    return this.httpClient.get<any>(url);
  }

  crearVigilaciaElectronica(VigilanciaElectronicaData: any): Observable<any> {
    const url = `${this.baseUrl}crearVigilanciaElc`;
    return this.httpClient.post<any>(url, VigilanciaElectronicaData);
  }

  editarVigilaciaElectronica(idvigilancia_electronica: number, VigilanciaElectronicaData: any): Observable<any> {
    const url = `${this.baseUrl}editVigilanciaElc/${idvigilancia_electronica}`;
    return this.httpClient.put<any>(url, VigilanciaElectronicaData);
  }

  eliminarVigilaciaElectronica(idvigilancia_electronica: number): Observable<any> {
    const url = `${this.baseUrl}EliminarVigilanciaElc/${idvigilancia_electronica}`; 
    return this.httpClient.delete<any>(url);
  }
}
