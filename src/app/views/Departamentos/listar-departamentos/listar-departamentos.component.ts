import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { DepartamentoService } from 'app/services/Departamento/departamento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-departamentos',
  templateUrl: './listar-departamentos.component.html',
  styleUrls: ['./listar-departamentos.component.css']
})
export class ListarDepartamentosComponent implements OnInit {
  @ViewChild('modalContent') modalContent: ElementRef<any> | null = null;
  departamentos: any[] = [];
  departamentosFiltrados: any[] = [];
  terminoBusqueda: string = '';
  noResultados: boolean = false;
  departamentoSeleccionado: any = {};
  mostrarModalEditar: boolean = false;
  mostrarModalVer: boolean = false;
  pageSize: number = 10;
  currentPage: number = 1;

  constructor(private departamentoService: DepartamentoService) { }

  ngOnInit(): void {
    this.listarDepartamentos();
  }

  handleCloseModal(): void {
    this.closeModal();
  }

  listarDepartamentos(): void {
    this.departamentoService.obtenerDepartamentos().subscribe(
      response => {
        this.departamentos = response.data[0];
        console.log('Departamentos listados', this.departamentos);
        this.filtrarDep();
      }, (error) => {
        console.log('Error al listar departamentos', error);
      }
    );
  }

  actualizarDepartamentos(): void {
    this.listarDepartamentos();
  }

  verDepartamneto(): void {
    this.listarDepartamentos();
  }

  abrirModalEditarDepartamento(departamento: any): void {
    this.departamentoSeleccionado = departamento;
    this.mostrarModalEditar = true;
  }

  abrirModalEditar() {
    this.mostrarModalEditar = true;
  }

  abrirModalVerDepartamento(departamento: any): void {
    this.departamentoSeleccionado = departamento;
    this.mostrarModalVer = true;
  }

  abrirModalVer() {
    this.mostrarModalVer = true;
  }

  closeModal(): void {
    this.mostrarModalEditar = false;
    this.mostrarModalVer = false;
  }

  EliminarDepartamento(iddepartamento: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.departamentoService.eliminarDepartamento(iddepartamento).subscribe(
          () => {
            Swal.fire(
              '¡Eliminado!',
              'El Departamento ha sido eliminado correctamente.',
              'success'
            );
            this.listarDepartamentos();
          },
          (error) => {
            Swal.fire(
              '¡Error!',
              'Ocurrió un error al intentar eliminar el Departamento.',
              'error'
            );
            console.error('Error al eliminar departamento:', error);
          }
        );
      }
    });
  }

  filtrarDep(): void {
    if (this.terminoBusqueda.trim() !== '') {
      this.departamentosFiltrados = this.departamentos.filter((departamento) => {
        return (
          departamento.departamento.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
        );
      });
    } else {
      this.departamentosFiltrados = [...this.departamentos];
    }
    this.noResultados = this.departamentosFiltrados.length === 0;
  }

  getPaginatedDepartamentos(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = this.currentPage * this.pageSize;
    return this.departamentosFiltrados.slice(startIndex, endIndex);
  }

  setPage(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  getPages(): number[] {
    if (!this.departamentosFiltrados) {
      return [];
    }
    const pageCount = Math.ceil(this.departamentosFiltrados.length / this.pageSize);
    return Array(pageCount).fill(0).map((x, i) => i + 1);
  }
}
