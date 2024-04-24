import { Component, onInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-regional',
  templateUrl: './regional.component.html',
  styleUrls: ['./regional.component.css']
})
export class RegionalComponent {

  nombreRegional: string = '';
  direccion: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient) { }

  guardarRegional(): void {
    const nuevaRegional = {
      nombre: this.nombreRegional,
      direccion: this.direccion
    };

    this.http.post<any>('/createRegional', nuevaRegional).subscribe(
      response => {
        console.log('Regional creada exitosamente:', response);
        // Aquí podrías agregar lógica adicional, como mostrar un mensaje de éxito o redirigir al usuario a otra página.
      },
      error => {
        console.error('Error al crear la regional:', error);
        this.errorMessage = 'Error al crear la regional. Por favor, inténtalo de nuevo más tarde.';
        // Aquí podrías manejar el error de otra manera, como mostrar un mensaje de error al usuario.
      }
    );
  }

}
