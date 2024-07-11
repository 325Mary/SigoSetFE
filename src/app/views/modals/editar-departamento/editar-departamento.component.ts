import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DepartamentoService } from 'app/services/Departamento/departamento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-departamento',
  templateUrl: './editar-departamento.component.html',
  styleUrls: ['./editar-departamento.component.css']
})
export class EditarDepartamentoComponent {
  @Input() departamentoSeleccionado: any;
  @Output() closeModal = new EventEmitter<void>();
  @Output() actualizarDepartamento = new EventEmitter<void>();

  constructor(private departamentoService: DepartamentoService) { }

  // actuDepartamento(): void {
  //   const depEditado = { departamento: this.departamentoSeleccionado.departamento };
  //   this.departamentoService.editarDepartamento(this.departamentoSeleccionado.iddepartamento, depEditado).subscribe(
  //     response => {
  //       console.log('Departamento actualizado', response);
  //       this.closeModal.emit();
  //       this.actualizarDepartamento.emit();
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Departamento actualizado!',
  //         text: 'El Departamento ha sido actualizado correctamente.'
  //       });
  //     },
  //     error => {
  //       console.error('Error al actualizar el Departamento:', error);
  //       let errorMessage = 'Ocurrió un error al intentar actualizar el Departamento. Por favor, inténtalo de nuevo.';
  //       if (error && error.error && error.error.message) {
  //         errorMessage = error.error.message;
  //       }
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Error',
  //         text: errorMessage
  //       });
  //     }
  //   );
  // }

  close(): void {
    this.closeModal.emit(); // Llama a closeModal.emit() para cerrar la modal
  }
}
