import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EmpresaService } from "../../../services/empresas/empresa.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.css']
})
export class EditarEmpresaComponent {
  @Input() empresaSeleccionada: any; 
  @Output() closeModal = new EventEmitter<void>();
  @Output() actualizarEmpresa = new EventEmitter<void>();
  
  constructor(private empresaService: EmpresaService) { }

  actuEmpresa(): void {
    const empresaActualizada = {
        direccion_empresav: this.empresaSeleccionada.direccion_empresa,
        email_empresav: this.empresaSeleccionada.email_empresa,
        email_personac: this.empresaSeleccionada.email_personac,
        email_representantel: this.empresaSeleccionada.email_representantel,
        nit_empresa: this.empresaSeleccionada.nit_empresa,
        nombre_empresav: this.empresaSeleccionada.nombre_empresa,
        persona_contacto: this.empresaSeleccionada.persona_contacto,
        representante_legal: this.empresaSeleccionada.representante_legal,
        telefono_empresav: this.empresaSeleccionada.telefono_empresa,
        telefono_personac: this.empresaSeleccionada.telefono_personac,
        telefono_representantel: this.empresaSeleccionada.telefono_representantel
        // Agrega aquí las demás propiedades que desees actualizar
    };

    this.empresaService.editarEmpresa(this.empresaSeleccionada.idempresa, empresaActualizada).subscribe(
        response => {
            console.log('Empresa actualizada:', response);
            this.closeModal.emit();
            this.actualizarEmpresa.emit();
            Swal.fire({
              icon: 'success',
              title: '¡Empresa actualizada!',
              text: 'La empresa ha sido actualizada correctamente.'
            });
        },
        error => {
            console.error('Error al actualizar la empresa:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ocurrió un error al intentar actualizar la empresa. Por favor, inténtalo de nuevo.'
            });
        }
    );
}


  close(): void {
    this.closeModal.emit();
  }
}
