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

  // Método para obtener todos los módulos
  obtenerModulos(): Observable<any> {
    return this.http.get<any>(this.baseUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para obtener un módulo por su ID
  obtenerModuloPorId(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para crear un nuevo módulo
  crearModulo(modulo: Modulo): Observable<any> {
    return this.http.post<any>(this.baseUrl, modulo)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para actualizar un módulo existente
  actualizarModulo(modulo: Modulo): Observable<any> {
    const url = `${this.baseUrl}/${modulo.idmodulo}`;
    return this.http.put<any>(url, modulo)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para eliminar un módulo por su ID
  eliminarModulo(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Manejo de errores
  private handleError(error: any) {
    console.error('Error en el servicio de módulos:', error);
    return throwError('Algo salió mal; por favor, inténtalo de nuevo más tarde.');
  }
}
