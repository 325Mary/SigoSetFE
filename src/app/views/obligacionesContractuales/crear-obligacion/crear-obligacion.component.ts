
import { Component } from '@angular/core';
import { ObligacionContractualService } from '../../../services/obligacionContractual/obligacion-contractual.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-crear-obligacion',
  templateUrl: './crear-obligacion.component.html',
  styleUrls: ['./crear-obligacion.component.css']
})
export class CrearObligacionComponent {
  nuevaObligacion = {
    obligaciones_contractuales: ''
  };

  constructor(private obligacionService: ObligacionContractualService, private router: Router) {}

  crearObligacion(): void {
    this.obligacionService.crearObligacionContractual(this.nuevaObligacion).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Obligación creada exitosamente'
        }).then((result) => {
          // Navegar a la ruta deseada después de cerrar el Sweet Alert
          this.router.navigate(['/administrarObligacionContractual']);
        });
      },
      error => {
      // Obtener el mensaje de error del objeto error
      let errorMessage = 'Ocurrió un error al crear la Obligacion. Por favor, inténtalo de nuevo más tarde.';
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
