import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PuestosVigilanciaService } from '../../../services/puestosvigilancia/puestosVig.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-vhumana',
  templateUrl: './editar-vhumana.component.html',
  styleUrls: ['./editar-vhumana.component.css']
})
export class EditarVHumanaComponent {
  @Input() mostrarModal: boolean = false;
  @Input() puestoSeleccionado: any;
  @Output() closeModal = new EventEmitter<void>();
  @Output() actualizarList = new EventEmitter<void>();

  constructor(private vigilanciaHumana: PuestosVigilanciaService) {}

  actuaList(): void {
    const datosActualizados = {
      descripcion_puesto: this.puestoSeleccionado.descripcion_puesto,
      tarifa_puesto: this.puestoSeleccionado.tarifa_puesto,
      ays: this.puestoSeleccionado.ays,
      iva: this.puestoSeleccionado.iva,
      total: this.puestoSeleccionado.total
    };
  
    this.vigilanciaHumana.editarPuesto(this.puestoSeleccionado.idpuesto_vigilancia, datosActualizados).subscribe(
      () => {
        this.actualizarList.emit();
        this.closeModal.emit();
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Vigilancia actualizada exitosamente.'
        });
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al actualizar la vigilancia.'
        });
        console.error('Error al actualizar la vigilancia electrónica:', error);
      }
    );
  }
  

  close(): void {
    this.closeModal.emit();
  }

  calcularTotales(): void {
    this.puestoSeleccionado.ays = this.puestoSeleccionado.tarifa_puesto * 0.08;
    this.puestoSeleccionado.iva = this.puestoSeleccionado.tarifa_puesto * 0.019;
    this.puestoSeleccionado.total = this.puestoSeleccionado.tarifa_puesto + this.puestoSeleccionado.ays + this.puestoSeleccionado.iva;
  }
}
