import { Component, ViewChild, ElementRef } from '@angular/core';
import {ContratoService} from '../../../services/contrato/contrato.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-contratos',
  templateUrl: './listar-contratos.component.html',
  styleUrls: ['./listar-contratos.component.css']
})
export class ListarContratosComponent {

  @ViewChild('modalContent') modalContent: ElementRef<any> | null = null;
  contratos: any[];
  showModal: boolean = false;
  showModal1: boolean = false;

  contratoSeleccionado: any = {};
  mostrarModalCrear: boolean = false; 
  mostrarModalEditar: boolean = false;
  idContratoAEditar: number | null = null;
  terminoBusqueda: string = '';
  noResultados: boolean = false;

constructor(private contratoService :ContratoService ){}

ngOnInit(): void {
  this.obtenerContratos();
}

obtenerContratos() {
  this.contratoService.obtenerContratos().subscribe(
    (response) => {
      this.contratos = response.data[0];
      console.log('contratos',this.contratos)
    },
    (error) => {
      console.error('Error al obtener contratos:', error);
    }
  );
}

actualizarContratos(): void {
  this.obtenerContratos(); // Llama al método para obtener los perfiles nuevamente
}
closeModal(): void {
  this.showModal = false;
  this.mostrarModalCrear = false;
  this.mostrarModalEditar = false;
}

handleCloseModal(): void {
  this.closeModal();
}



abrirModalEditar(Contrato: any): void {
  this.contratoSeleccionado = Contrato;
  console.log('Contratos', this.contratoSeleccionado)
  this.mostrarModalEditar = true;
}

eliminarContrato(idContrato_empresa: number): void {
  Swal.fire({
    title: '¿Estás seguro?',
    text: '¡No podrás revertir esto!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminarlo',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {

      this.contratoService.eliminarContrato(idContrato_empresa).subscribe(
        () => {
          Swal.fire(
            '¡Eliminado!',
            'La Contrato ha sido eliminada correctamente.',
            'success'
          );
          this.obtenerContratos();
        },
        (error) => {
          // Mostrar un mensaje de error si ocurre algún problema durante la eliminación
          Swal.fire(
            '¡Error!',
            'Ocurrió un error al intentar eliminar la Contrato.',
            'error'
          );
          console.error('Error al eliminar Contrato:', error);
        }
      );
    }
  });
}

filtrarContratos(): any[] {
  const contratosFiltradas = this.contratos.filter((contrato) => {
    return (
      contrato.nombre_empresa.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      contrato.fecha_inicio.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      contrato.fecha_fin.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
    );
  });
  this.noResultados = contratosFiltradas.length === 0;
  return contratosFiltradas;
}

}

