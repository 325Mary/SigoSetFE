import { Component, OnInit } from '@angular/core';
import { DepartamentoService } from 'app/services/Departamento/departamento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-departamentos',
  templateUrl: './listar-departamentos.component.html',
  styleUrls: ['./listar-departamentos.component.css']
})
export class ListarDepartamentosComponent implements OnInit {
  departamentos: any[] = [];
  departamentosFiltrados: any[] = [];
  terminoBusqueda: string = '';
  noResultados: boolean = false;
  departamentoSeleccionado: any = {};
  mostrarModalEditar: boolean = false;
  mostrarModalVer: boolean = false;

  constructor(private departamentoService: DepartamentoService) { }

  ngOnInit(): void {
    this.listarDepartamentos();
  }

  listarDepartamentos() {
    this.departamentoService.obtenerDepartamentos().subscribe(
      (response) => {
        if (response && response.data) {
          this.departamentos = response.data;
          this.departamentosFiltrados = response.data; // Inicializa los departamentos filtrados
        } else {
          this.departamentos = [];
          this.departamentosFiltrados = [];
        }
        console.log('Estos son los departamentos', this.departamentos);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "!Departamentos listados correctamente¡",
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error) => {
        console.log('Error al obtener Departamentos', error);
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: "!No se pueden listar los Departamentos",
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }

  actualizarDepartamentos(): void {
    this.listarDepartamentos();
  }

  abrirModalEditarDepartamento(departamento: any): void {
    this.departamentoSeleccionado = departamento;
    this.mostrarModalEditar = true;
  }

  abrirModalVerDepartamento(departamento: any): void {
    this.departamentoSeleccionado = departamento;
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
    this.departamentosFiltrados = this.departamentos.filter((departamento) => {
      return departamento && departamento.departamento && departamento.departamento.toLowerCase().includes(this.terminoBusqueda.toLowerCase());
    });
    this.noResultados = this.departamentosFiltrados.length === 0;
  }
}
