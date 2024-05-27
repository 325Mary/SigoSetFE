// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { environment } from '../../../environments/environment';

// interface Modulo {
//   idmodulo: number;
//   id_modulo_padre: number;
//   modulo: string;
//   url_modulo: string;
//   icono: string;
//   orden: number;
//   hijos: number | null;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class ModuloService {
//   private baseUrl = environment.apiUrl;

//   constructor(private http: HttpClient) { }

//   // Método para obtener todos los módulos
//   obtenerModulos(): Observable<any> {
//     return this.http.get<any>(this.baseUrl)
//       .pipe(
//         catchError(this.handleError)
//       );
//   }

//   // Método para obtener un módulo por su ID
//   obtenerModuloPorId(id: number): Observable<any> {
//     const url = `${this.baseUrl}/${id}`;
//     return this.http.get<any>(url)
//       .pipe(
//         catchError(this.handleError)
//       );
//   }

//   // Método para crear un nuevo módulo
//   crearModulo(modulo: Modulo): Observable<any> {
//     return this.http.post<any>(this.baseUrl, modulo)
//       .pipe(
//         catchError(this.handleError)
//       );
//   }

//   // Método para actualizar un módulo existente
//   actualizarModulo(modulo: Modulo): Observable<any> {
//     const url = `${this.baseUrl}/${modulo.idmodulo}`;
//     return this.http.put<any>(url, modulo)
//       .pipe(
//         catchError(this.handleError)
//       );
//   }

//   // Método para eliminar un módulo por su ID
//   eliminarModulo(id: number): Observable<any> {
//     const url = `${this.baseUrl}/${id}`;
//     return this.http.delete(url)
//       .pipe(
//         catchError(this.handleError)
//       );
//   }

//   // Manejo de errores
//   private handleError(error: any) {
//     console.error('Error en el servicio de módulos:', error);
//     return throwError('Algo salió mal; por favor, inténtalo de nuevo más tarde.');
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

interface Modulo {
  idmodulo: number;
  id_modulo_padre: number;
  modulo: string;
  url_modulo: string;
  icono: string;
  orden: number;
  hijos: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class ModuloService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  obtenerModulos(): Observable<Modulo[]> {
    return this.http.get<Modulo[]>(this.baseUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  obtenerModuloPorId(id: number): Observable<Modulo> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Modulo>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  crearModulo(modulo: Modulo): Observable<Modulo> {
    return this.http.post<Modulo>(this.baseUrl, modulo)
      .pipe(
        catchError(this.handleError)
      );
  }

  actualizarModulo(modulo: Modulo): Observable<Modulo> {
    const url = `${this.baseUrl}/${modulo.idmodulo}`;
    return this.http.put<Modulo>(url, modulo)
      .pipe(
        catchError(this.handleError)
      );
  }

  eliminarModulo(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('Error en el servicio de módulos:', error);
    return throwError('Algo salió mal; por favor, inténtalo de nuevo más tarde.');
  }
}
