import { Component, Input, Output, EventEmitter, SimpleChanges  } from '@angular/core';
import Swal from 'sweetalert2';
import { ContratoService } from '../../../services/contrato/contrato.service'

@Component({
  selector: 'app-editar-contrato',
  templateUrl: './editar-contrato.component.html',
  styleUrls: ['./editar-contrato.component.css']
})
export class EditarContratoComponent {
  @Input() contratoSeleccionado: any;
  @Output() closeModal = new EventEmitter<void>();
  @Output() actualizarContratos = new EventEmitter<void>();
  fechaInicioEdit: string; 
  fechaFinEdit: string;
  selectedFile: File | null = null; 


  constructor(private contratoService: ContratoService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.contratoSeleccionado && changes.contratoSeleccionado.currentValue) {
      this.fechaInicioEdit = this.formatearFecha(this.contratoSeleccionado.fecha_inicio);
      this.fechaFinEdit = this.formatearFecha(this.contratoSeleccionado.fecha_fin);
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];  
  }


  actualizarContrato(): void {
    if (new Date(this.fechaFinEdit) < new Date(this.fechaInicioEdit)) {
      Swal.fire('¡Error!', 'La fecha final no puede ser menor a la fecha inicial', 'error');
      return; 
    }
    this.contratoSeleccionado.fecha_inicio = this.fechaInicioEdit;
    this.contratoSeleccionado.fecha_fin = this.fechaFinEdit;

    const formData = new FormData();
    formData.append('fecha_inicio', this.fechaInicioEdit);
    formData.append('fecha_fin', this.fechaFinEdit);
    if (this.selectedFile) {
      formData.append('contrato_pdf', this.selectedFile, this.selectedFile.name);
    }

    this.contratoService.editarContrato(this.contratoSeleccionado.idContrato_empresa, formData).subscribe(
      response => {
        console.log('contrato actualizado:', response);
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
      return '';
    }
    return date.toISOString().slice(0, 10);
  }
  
  close(): void {
    this.closeModal.emit();
  }
}
