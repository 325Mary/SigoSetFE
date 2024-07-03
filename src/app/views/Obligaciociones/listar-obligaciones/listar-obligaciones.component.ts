import { Component, OnInit } from '@angular/core';
import { ObligacionesContratoService } from '../../../services/obligacionesContrato/obligaciones-contrato.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-obligaciones',
  templateUrl: './listar-obligaciones.component.html',
  styleUrls: ['./listar-obligaciones.component.css']
})
export class ListarObligacionesComponent implements OnInit {
  contratistas: any[] = [];
  contractuales: any[] = [];
  contratistasFiltrados: any[] = [];
  contractualesFiltrados: any[] = [];
  searchTextContratistas: string = '';
  searchTextContractuales: string = '';
  contratistasPage: number = 1; // Página actual para contratistas
  contractualesPage: number = 1; // Página actual para contractuales
  obligacionSeleccionada: any = {};
  mostrarModalObligaciones: boolean = false;
  mostrarModalEditar: boolean = false;
  mostrarModalCrear: boolean = false;
  pageSize: number = 10; 
  currentPage: number = 1;
  terminoBusqueda: string = '';
  noResultados: boolean = false;

  constructor(private obligacionesContratoService: ObligacionesContratoService) {}

  ngOnInit(): void {
    this.obtenerObligaciones();
  }

  obtenerObligaciones() {
    this.obligacionesContratoService.obtenerObligacionesContrato().subscribe(
      (response: any) => {
        this.contratistas = response.data.filter((item: any) => item.obligacion_contratista !== null);
        this.contractuales = response.data.filter((item: any) => item.obligaciones_contractuales !== null);
        this.filtrarContratistas();
        this.filtrarContractuales();
      },
      (error) => {
        console.error('Error al obtener obligaciones:', error);
      }
    );
  }

  filtrarContratistas() {
    const filterValue = this.searchTextContratistas.toLowerCase().trim();
    this.contratistasFiltrados = this.contratistas.filter((obligacion: any) =>
      obligacion.nombre_empresa.toLowerCase().includes(filterValue) ||
      obligacion.obligacion_contratista.toLowerCase().includes(filterValue)||
      obligacion.descripcion_contrato.toLowerCase().includes(filterValue)
    );
  }
  
  filtrarContractuales() {
    const filterValue = this.searchTextContractuales.toLowerCase().trim();
    this.contractualesFiltrados = this.contractuales.filter((obligacion: any) =>
      obligacion.nombre_empresa.toLowerCase().includes(filterValue) ||
      obligacion.obligaciones_contractuales.toLowerCase().includes(filterValue)||
      obligacion.descripcion_contrato.toLowerCase().includes(filterValue)

    );
  }

  confirmarEliminacion(idobligaciones_contrato: number) {
    Swal.fire({
      title: '¿Está seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarObligacion(idobligaciones_contrato);
      }
    });
  }

  eliminarObligacion(idobligaciones_contrato: number) {
    this.obligacionesContratoService.EliminarObligacionContrato(idobligaciones_contrato).subscribe(
      (response) => {
        console.log('Obligación eliminada:', response);
        this.obtenerObligaciones(); // Actualizar la lista
      },
      (error) => {
        console.error('Error al eliminar la obligación:', error);
      }
    );
  }

  closeModal(): void {
    this.mostrarModalObligaciones = false;
    this.mostrarModalEditar = false;
    this.mostrarModalCrear = false;
  }

  abrirModalVerO(obligacion: any): void {
    this.obligacionSeleccionada = obligacion;
    this.mostrarModalObligaciones = true;
  }

  handleCloseModal(): void {
    this.obligacionSeleccionada = {};
    this.mostrarModalObligaciones = false;
    this.mostrarModalEditar = false;
    this.mostrarModalCrear = false;
  }

  abrirModalEditar(obligacion: any): void {
    this.obligacionSeleccionada = obligacion;
    this.mostrarModalEditar = true;
  }

  abrirModalCrear(): void {
    this.mostrarModalCrear = true;
  }

  handleActualizarObligacion(obligacion: any): void {
    this.obtenerObligaciones();
    this.handleCloseModal();
  }

  actualizarObC(): void {
    this.obtenerObligaciones();
  }
  cambiarPaginaContratistas(event: any): void {
    this.contractualesPage = event;
  }
  cambiarPaginaContractuales(event: any): void {
    this.contractualesPage = event;
  }
}
