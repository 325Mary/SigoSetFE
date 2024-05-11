import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {ContratoService} from '../../../services/contrato/contrato.service'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-contrato',
  templateUrl: './crear-contrato.component.html',
  styleUrls: ['./crear-contrato.component.css']
})
export class CrearContratoComponent {

  @Output() contratoCreado: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  nuevoContrato: any = {};
  
  constructor(private contratoService: ContratoService, private router: Router ) { }

  ngOnInit(): void {
  }
  crearContrato() {
    this.contratoService.crearContrato(this.nuevoContrato).subscribe(
      (response) => {
        console.log('Perfil creado exitosamente:', response.data);
        this.nuevoContrato = {}; // Limpiar datos del nuevo perfil
        this.contratoCreado.emit()
        // Mostrar Sweet Alert de éxito
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Empresa creado exitosamente'
        }).then((result) => {
          // Navegar a la ruta deseada después de cerrar el Sweet Alert
          this.router.navigate(['/ListEmpresas']);
        });
      },
      (error) => {
        console.error('Error al crear Empresa:', error);
  
        // Obtener el mensaje de error del objeto error
        let errorMessage = 'Ocurrió un error al crear la Empresa. Por favor, inténtalo de nuevo más tarde.';
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
  
  
  camposCompletos(): boolean {
    return !!(
        this.nuevoContrato.nombre_empresav &&
        this.nuevoContrato.nit_empresa &&
        this.nuevoContrato.direccion_empresav &&
        this.nuevoContrato.telefono_empresav &&
        this.nuevoContrato.email_empresav &&
        this.nuevoContrato.persona_contacto &&
        this.nuevoContrato.telefono_personac &&
        this.nuevoContrato.email_personac &&
        this.nuevoContrato.representante_legal &&
        this.nuevoContrato.telefono_representantel &&
        this.nuevoContrato.email_representantel
    );
}

}
