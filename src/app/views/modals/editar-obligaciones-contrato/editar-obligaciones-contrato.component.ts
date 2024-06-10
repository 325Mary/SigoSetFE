import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ObligacionesContratoService } from '../../../services/obligacionesContrato/obligaciones-contrato.service';
import { EmpresaService } from '../../../services/empresas/empresa.service';
import { ContratoService } from '../../../services/contrato/contrato.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-obligaciones-contrato',
  templateUrl: './editar-obligaciones-contrato.component.html',
  styleUrls: ['./editar-obligaciones-contrato.component.css']
})
export class EditarObligacionesContratoComponent  {
  @Input() obligacionSeleccionada: any;
  @Output() closeModal = new EventEmitter<void>();
  @Output() actualizarObligacion = new EventEmitter<any>();
  @Input() mostrarModalEditar: boolean = false;
  contratos: any[] = [];

  constructor(
    private obligacionesContratoService: ObligacionesContratoService,
    private empresaService: EmpresaService,
    private contratoService: ContratoService
  ) { }

  ngOnInit(): void {
  
    this.obtenerContratos();
  }

  close(): void {
    this.closeModal.emit();
  }

  obtenerContratos(): void {
    this.contratoService.obtenerContratos().subscribe(
      (response) => {
        this.contratos = response.data[0]; 
        console.log('contratos', this.contratos);
      },
      (error) => {
        console.error('Error al obtener contratos:', error);
      }
    );
  }

  onEmpresaChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const selectedContrato = this.contratos.find(contrato => contrato.nombre_empresa === inputElement.value);
    if (selectedContrato) {
      this.obligacionSeleccionada.idContrato_empresa = selectedContrato.idContrato_empresa;
    }
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const updatedObligacion = {
        idContrato_empresa: this.obligacionSeleccionada.idContrato_empresa
      };
      this.obligacionesContratoService.EditarObligacionContrato(this.obligacionSeleccionada.idobligaciones_contrato, updatedObligacion)
        .subscribe(
          response => {
            console.log('Obligación actualizada:', response);
            this.actualizarObligacion.emit(this.obligacionSeleccionada);
            this.close();
            Swal.fire({
              icon: 'success',
              title: '¡Éxito!',
              text: 'Obligacion Por contrato modificada exitosamente'
            })
          },
          error => {
            console.error('Error al actualizar la obligación:', error);
            Swal.fire({
              icon: 'error',
              title: '¡Error!',
              text: "Ocurrio un error al modificarla. Intente nuevamente"
            });
          }
        );
    }
  }
}
