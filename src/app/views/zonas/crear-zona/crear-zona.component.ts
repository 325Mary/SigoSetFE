import { Component } from '@angular/core';
import { ZonaService } from 'app/services/zona/zona.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-zona',
  templateUrl: './crear-zona.component.html',
  styleUrls: ['./crear-zona.component.css']
})
export class CrearZonaComponent{
  nuevaZona: any = {};

  constructor(private zonaservice: ZonaService, private router: Router) { }

  ngOnInit(): void {
  }

  crearZona() {
    this.zonaservice.crearZona(this.nuevaZona).subscribe(
      (response) => {
        console.log('Zona creado exitosamente:', response);
        this.nuevaZona = {}; // Limpiar datos del nuevo perfil

        // Mostrar Sweet Alert de éxito
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Zona creada exitosamente'
        }).then((result) => {
          // Navegar a la ruta deseada después de cerrar el Sweet Alert
          this.router.navigate(['/list-zonas']);
        });
      },
      (error) => {
        console.error('Error al crear Zona:', error);

        // Obtener el mensaje de error del objeto error
        let errorMessage = 'Ocurrió un error al crear la Zona. Por favor, inténtalo de nuevo más tarde.';
        if (error && error.error && error.error.message) {
          errorMessage = error.error.message;
        }

        // Mostrar Sweet Alert de error con el mensaje específico
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: errorMessage
        });
      }
    );
  }

}
