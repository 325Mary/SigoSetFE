import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import Swal from 'sweetalert2';
import { ContratoService } from '../../../services/contrato/contrato.service';

@Component({
  selector: 'app-editar-contrato',
  templateUrl: './editar-contrato.component.html',
  styleUrls: ['./editar-contrato.component.css']
})
export class EditarContratoComponent {
  @Input() contratoSeleccionado: any;
  @Output() closeModal = new EventEmitter<void>();
  @Output() actualizarContratos = new EventEmitter<void>();
  fechaInicioEdit: string; // Variable para la fecha de inicio editada
  fechaFinEdit: string; // Variable para la fecha final editada
  descripcionEdit: string; // Variable para la descripción editada

  constructor(private contratoService: ContratoService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.contratoSeleccionado && changes.contratoSeleccionado.currentValue) {
      this.fechaInicioEdit = this.formatearFecha(this.contratoSeleccionado.fecha_inicio);
      this.fechaFinEdit = this.formatearFecha(this.contratoSeleccionado.fecha_fin);
      this.descripcionEdit = this.contratoSeleccionado.descripcion_contrato;
    }
  }

  actualizarContrato(): void {
    this.contratoSeleccionado.fecha_inicio = this.fechaInicioEdit;
    this.contratoSeleccionado.fecha_fin = this.fechaFinEdit;
    this.contratoSeleccionado.descripcion_contrato = this.descripcionEdit;

    const nuevoContratoData = {
      fecha_inicio: this.fechaInicioEdit,
      fecha_fin: this.fechaFinEdit,
      descripcion_contrato: this.descripcionEdit
    };

    console.log('Datos: ',nuevoContratoData);
    
    this.contratoService.editarContrato(this.contratoSeleccionado.idContrato_empresa, nuevoContratoData).subscribe(
      response => {
        console.log('Contrato actualizado:', response);
        Swal.fire('¡Éxito!', 'Contrato actualizado correctamente', 'success');

        this.closeModal.emit();
        this.actualizarContratos.emit();
      },
      error => {
        console.error('Error al actualizar el contrato:', error);
        Swal.fire('¡Error!', 'Hubo un error al actualizar el contrato', 'error');
      }
    );
  }

  formatearFecha(fecha: string): string {
    const date = new Date(fecha);
    if (isNaN(date.getTime())) {
      return ''; // Devuelve una cadena vacía si la fecha es inválida
    }
    return date.toISOString().slice(0, 10);
  }

  close(): void {
    this.closeModal.emit();
  }
}
