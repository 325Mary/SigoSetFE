import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { ResponseI } from '../../models/response.interface';
import { Observable, throwError } from 'rxjs'
import {CentroFormacion} from '../../models/centro-formacion/centro-formacion'
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CentroFormacionService {
  private baseUrl: string;
  private myApiUrlCentrosFormacion: string;
  private myApiUrlCentroFormacion: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
    this.myApiUrlCentrosFormacion = 'centrosFormacion';
    this.myApiUrlCentroFormacion = 'centroFormacion/';
   }
  getCentrosFormacion(): Observable<ResponseI>{
    let direccion = this.baseUrl+ this.myApiUrlCentrosFormacion
    return this.http.get<ResponseI>(direccion)
    .pipe(
      catchError(err => {
        // console.log("Error en el servidor");
      return throwError(err);
      })
    )
  }

  eliminarCentroFormacion(id:string): Observable<ResponseI>{
    let direccion = this.baseUrl+ this.myApiUrlCentroFormacion
    return this.http.delete<ResponseI>(`${direccion}${id}`)
    .pipe(
      catchError(err => {
        return throwError(err)
      })
    )
  }

  registrarCentroFormacion(centroFormacion:CentroFormacion): Observable<ResponseI>{
    let direccion = this.baseUrl+ this.myApiUrlCentroFormacion
    return this.http.post<ResponseI>(direccion, centroFormacion )
    .pipe(
      catchError(err => {
        return throwError(err)
      })
    )
  }

  
  getCentroFormacion(id:string): Observable<ResponseI>{
    let direccion = this.baseUrl+ this.myApiUrlCentroFormacion
    return this.http.get<ResponseI>(`${direccion}${id}`)
    .pipe(
      catchError(err => {
        return throwError(err)
      })
    )
  }

  editarCentroFormacion(id:string, centroFormacion:CentroFormacion): Observable<CentroFormacion>{
    let direccion = this.baseUrl+ this.myApiUrlCentroFormacion
  
    return this.http.put<CentroFormacion>(`${direccion}${id}`, centroFormacion)
    .pipe(
      catchError(err => {
        return throwError(err)
      })
    )
  }
}
