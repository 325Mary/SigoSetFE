import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModuloService } from '../../../services/modulos/modulos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-modulo',
  templateUrl: './lista-modulos.component.html',
  styleUrls: ['./lista-modulos.component.css']
})
export class ListaModuloComponent implements OnInit {
  @ViewChild('modalContent') modalContent: ElementRef<any> | null = null;
  showModal: boolean = false;
  mostrarModalEditar: boolean = false;
  ModuloSeleccionado: any = {};
  modulofiltrado:any[]=[]
  modulos: any[] = [];
  terminoBusqueda: string = '';
  noResultados: boolean = false;
  pageSize: number = 10;
  currentPage: number = 1;

  constructor(private moduloService: ModuloService) { }

  ngOnInit(): void {
    this.obtenerModulos();
  }

  setPage(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  getPages(): number[] {
    const pageCount = Math.ceil(this.modulos.length / this.pageSize);
    return Array(pageCount).fill(0).map((x, i) => i + 1);
  }

  obtenerModulos() {
    this.moduloService.obtenerModulos().subscribe(
      (response: any) => {
        this.modulos = response.data[0];
        this.filtrarModulos();
      },
      error => {
        console.error('Error al obtener los módulos:', error);
      }
    );
  }

  eliminarModulo(idmodulo: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.moduloService.eliminarModulo(idmodulo).subscribe(
          () => {
            this.modulos = this.modulos.filter(modulo => modulo.idmodulo !== idmodulo);
            Swal.fire(
              'Eliminado!',
              'El módulo ha sido eliminado.',
              'success'
            );
          },
          error => {
            Swal.fire(
              'Error!',
              'Hubo un problema al eliminar el módulo.',
              'error'
            );
            console.error('Error al eliminar el módulo:', error);
          }
        );
      }
    });
  }

  closeModal(): void {
    this.showModal = false;
    this.mostrarModalEditar = false;
  }

  abrirModalEditar(item: any): void {
    this.ModuloSeleccionado = item;
    this.mostrarModalEditar = true;
  }

  handleCloseModal(): void {
    this.mostrarModalEditar = false;
  }

  filtrarModulos(): void{
    if (this.terminoBusqueda.trim() !== '') {
        this.modulofiltrado = this.modulos.filter(modulo => {
      return (
        modulo.modulo.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        modulo.url_modulo.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        modulo.icono.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        modulo.orden.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        modulo.hijos.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase())
      );
    });
    this.noResultados = this.modulofiltrado.length === 0;
    this.currentPage = 1
  
  }else{
    this.modulofiltrado=[...this.modulos]
  }

  
  
  }
  pageChange(event: number): void {
    this.currentPage = event;
  }
}
