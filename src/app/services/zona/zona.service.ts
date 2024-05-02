import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { ResponseI } from '../../models/response.interface';
import { Observable, throwError } from 'rxjs'
import { Zona } from '../../models/zona/zona'
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ZonaService {

  private baseUrl: string;
  private myApiUrlZonas: string;
  private myApiUrlZona: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
    this.myApiUrlZonas = 'Zonas';
    this.myApiUrlZona = 'zona/';
   }
  getZonas(): Observable<ResponseI>{
    let direccion = this.baseUrl+ this.myApiUrlZonas
    return this.http.get<ResponseI>(direccion)
    .pipe(
      catchError(err => {
        // console.log("Error en el servidor");
      return throwError(err);
      })
    )
  }

  eliminarZona(id:string): Observable<ResponseI>{
    let direccion = this.baseUrl+ this.myApiUrlZona
    return this.http.delete<ResponseI>(`${direccion}${id}`)
    .pipe(
      catchError(err => {
        return throwError(err)
      })
    )
  }

  registrarZona(zona:Zona): Observable<ResponseI>{
    let direccion = this.baseUrl+ this.myApiUrlZona
    return this.http.post<ResponseI>(direccion, zona )
    .pipe(
      catchError(err => {
        return throwError(err)
      })
    )
  }

  getZona(id:string | number) : Observable<ResponseI>{
    let direccion = this.baseUrl+ this.myApiUrlZona
    return this.http.get<ResponseI>(`${direccion}${id}`)
    .pipe(
      catchError(err => {
        return throwError(err)
      })
    )
  }

  editarCentroFormacion(id:string, zona:Zona): Observable<Zona>{
    let direccion = this.baseUrl+ this.myApiUrlZona
  
    return this.http.put<Zona>(`${direccion}${id}`, zona)
    .pipe(
      catchError(err => {
        return throwError(err)
      })
    )
  }
}
