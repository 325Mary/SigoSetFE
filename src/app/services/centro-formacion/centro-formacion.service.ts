import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { catchError, map } from 'rxjs';
import { ResponseI } from '../../models/response.interface';
import { Observable, throwError } from 'rxjs'
import {CentroFormacion} from '../../models/centro-formacion/centro-formacion'
import { environment } from '../../../environments/environment';
import {  TokenValidationService} from "../../services/VertificacionUser/token-validation.service";
import { Console } from 'console';

@Injectable({
  providedIn: 'root'
})
export class CentroFormacionService {
  private baseUrl: string;
  private myApiUrlCentrosFormacion: string;
  private myApiUrlCentroFormacion: string;
  private getHeaders(): HttpHeaders {
    const token = this.tokenValidationService.getToken(); // Obtén el token de autenticación
    console.log(token)
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}` // Agrega el token al encabezado de autorización
    });
  }
  constructor(private http: HttpClient, private tokenValidationService: TokenValidationService) {
    this.baseUrl = environment.apiUrl;
    this.myApiUrlCentrosFormacion = 'centrosFormacion';
    this.myApiUrlCentroFormacion = 'centroFormacion/';
    
   }
   getCentrosFormacion(): Observable<ResponseI> {
    const direccion = `${this.baseUrl}${this.myApiUrlCentrosFormacion}`;
    return this.http.get<ResponseI>(direccion, { headers: this.getHeaders() }).pipe(
      map(response => {
        if (Array.isArray(response.data)) {
          return response;
        } else {
          response.data = [response.data];
          return response;
        }
      }),
      catchError(err => {
        console.error('Error al obtener centros de formación:', err);
        return throwError(err);
      })
    );
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
