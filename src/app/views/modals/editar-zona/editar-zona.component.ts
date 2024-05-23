import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ZonaService } from 'app/services/zona/zona.service';
import Swal from 'sweetalert2';

interface Zona {
  idzona: number;
  Nombre_zona: string;
  // Agrega aquí más propiedades si es necesario
}

@Component({
  selector: 'app-editar-zona',
  templateUrl: './editar-zona.component.html',
  styleUrls: ['./editar-zona.component.css']
})
export class EditarZonaComponent {
  @Input() zonaseleccionada: Zona;
  @Output() closeModal = new EventEmitter<void>();
  @Output() actualizarZona = new EventEmitter<void>();

  constructor(private zonaservice: ZonaService) {}

  actuZona(): void {
    const zonaActualizada = { Nombre_zona: this.zonaseleccionada.Nombre_zona };
    this.zonaservice.editarZona(this.zonaseleccionada.idzona, zonaActualizada).subscribe(
      response => {
        console.log('Zona actualizada', response);
        this.closeModal.emit();
        this.actualizarZona.emit();
        Swal.fire({
          icon: 'success',
          title: 'Zona actualizada!',
          text: 'La Zona ha sido actualizada correctamente.'
        });
      },
      error => {
        console.error('Error al actualizar la Zona:', error);
        let errorMessage = 'Ocurrió un error al intentar actualizar la Zona. Por favor, inténtalo de nuevo.';
        if (error && error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage
        });
      }
    );
  }

  close(): void {
    this.closeModal.emit();
  }

  ngOnInit(): void {}
}
