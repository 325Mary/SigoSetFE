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
  pageSize: number = 6; 
  currentPage: number = 1; // Página actual
  contratoSeleccionado: any = {};
  mostrarModalCrear: boolean = false; 
  mostrarModalEditar: boolean = false;
  idContratoAEditar: number | null = null;
  terminoBusqueda: string = '';
  noResultados: boolean = false;
  usuarioIndex: number = 0; // Contador para mostrar un ID autoincrementable
  contratosFiltrados: any[] = []; // Array para almacenar  filtrados
  fechaInicioEdit: string;
  fechaFinEdit: string;
  
constructor(private contratoService :ContratoService ){}

ngOnInit(): void {
  this.obtenerContratos();
}

obtenerContratos() {
  this.contratoService.obtenerContratos().subscribe(
    (response) => {
      this.contratos = response.data[0];
      this.contratosFiltrados = [...this.contratos];
      console.log('contratos',this.contratos)
    },
    (error) => {
      console.error('Error al obtener contratos:', error);
    }
  );
}
abrirModalCrear(): void {
  this.mostrarModalCrear = true; 
}

actualizarContratos(): void {
  this.obtenerContratos(); 
}
closeModal(): void {
  this.showModal = false;
  this.mostrarModalCrear = false;
  this.mostrarModalEditar = false;
  this.refreshList()
}

handleCloseModal(): void {
  this.closeModal();
}



abrirModalEditar(contrato: any): void {
  this.contratoSeleccionado = contrato;

  // Asignar las fechas del contrato seleccionado a las variables de fecha para mostrarlas en los campos de entrada
  this.fechaInicioEdit = this.contratoSeleccionado.fecha_inicio;
  this.fechaFinEdit = this.contratoSeleccionado.fecha_fin;

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
          this.refreshList()
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

filtrarContratos(): void {
  if (this.terminoBusqueda.trim() !== '') {
    this.contratosFiltrados = this.contratos.filter((contrato) => {
      return (
        contrato.nombre_empresa.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        contrato.fecha_inicio.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        contrato.fecha_fin.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
      );
    });
    this.noResultados = this.contratosFiltrados.length === 0;
  } else {
    this.contratosFiltrados = [...this.contratos];
    this.noResultados = false; // Resetear el indicador de resultados vacíos
  }
}

setPage(pageNumber: number) {
  this.currentPage = pageNumber;
}

// Función para obtener los números de página disponibles
getPages(): number[] {
  const pageCount = Math.ceil(this.contratosFiltrados.length / this.pageSize);
  return Array(pageCount).fill(0).map((x, i) => i + 1);
}

// Función para obtener el índice del contrato en la lista filtrada
contratoIndex(contrato: any): number {
  return this.contratosFiltrados.indexOf(contrato) + 1;
}


private refreshList() {
  // Vuelve a cargar la lista de usuarios después de eliminar uno
  this.contratoService.obtenerContratos().subscribe(
    response => {
      if (response.data && response.data.length > 0) {
        this.contratos = response.data[0];
        this.contratosFiltrados = [...this.contratos];
        console.log('Lista de usuarios actualizada:', this.contratos);
        this.usuarioIndex = (this.currentPage - 1) * this.pageSize;
      } else {
        console.error('La respuesta no contiene datos o el primer array está vacío.');
      }
    },
    error => {
      console.error('Error al obtener la lista de usuarios:', error);
    }
  );
}

}

