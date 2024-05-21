import { Component, ViewChild, ElementRef } from '@angular/core';
import {EmpresaService} from '../../../services/empresas/empresa.service'
import Swal from 'sweetalert2';



@Component({
  selector: 'app-listar-empresa',
  templateUrl: './listar-empresa.component.html',
  styleUrls: ['./listar-empresa.component.css']
})
export class ListarEmpresaComponent {

  @ViewChild('modalContent') modalContent: ElementRef<any> | null = null;
  empresas: any[];
  showModal: boolean = false;
  showModal1: boolean = false;

  empresaSeleccionada: any = {};

  mostrarModalCrear: boolean = false; 
  mostrarModalEditar: boolean = false;
  
  idEmpresaAEditar: number | null = null;
  terminoBusqueda: string = '';
  noResultados: boolean = false;

constructor(private empresaService :EmpresaService ){}

ngOnInit(): void {
  this.obtenerEmpresas();
}

obtenerEmpresas() {
  this.empresaService.obtenerEmpresas().subscribe(
    (response) => {
      this.empresas = response.data[0];
      console.log('empresas',this.empresas)
    },
    (error) => {
      console.error('Error al obtener perfiles:', error);
    }
  );
}

actualizarEmpresa(): void {
  this.obtenerEmpresas(); // Llama al método para obtener los perfiles nuevamente
}
closeModal(): void {
  this.showModal = false;
  this.mostrarModalCrear = false;
  this.mostrarModalEditar = false;
}

handleCloseModal(): void {
  this.closeModal();
}

abrirModalVerEmpresa(empresa: any): void {
  this.empresaSeleccionada = empresa;
  this.showModal = true;
}

abrirModalEditar(empresa: any): void {
  this.empresaSeleccionada = empresa;
  console.log('émpresa', this.empresaSeleccionada)
  this.mostrarModalEditar = true;
}

eliminarEmpresa(idempresa: number): void {
  // Mostrar un cuadro de confirmación antes de eliminar la empresa
  Swal.fire({
    title: '¿Estás seguro?',
    text: '¡No podrás revertir esto!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminarlo',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      // Llamar al servicio para eliminar la empresa
      this.empresaService.eliminarEmpresa(idempresa).subscribe(
        () => {
          // Mostrar un mensaje de éxito después de eliminar la empresa
          Swal.fire(
            '¡Eliminado!',
            'La empresa ha sido eliminada correctamente.',
            'success'
          );
          // Actualizar la lista de empresas después de la eliminación
          this.obtenerEmpresas();
        },
        (error) => {
          // Mostrar un mensaje de error si ocurre algún problema durante la eliminación
          Swal.fire(
            '¡Error!',
            'Ocurrió un error al intentar eliminar la empresa.',
            'error'
          );
          console.error('Error al eliminar empresa:', error);
        }
      );
    }
  });
}

filtrarEmpresas(): any[] {
  const empresasFiltradas = this.empresas.filter((empresa) => {
    return (
      empresa.nombre_empresa.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      empresa.nit_empresa.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      empresa.direccion_empresa.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
    );
  });
  this.noResultados = empresasFiltradas.length === 0;
  return empresasFiltradas;
}

}
