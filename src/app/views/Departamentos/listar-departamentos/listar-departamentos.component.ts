import { Component, ViewChild,ElementRef } from '@angular/core';
import { DepartamentoService } from 'app/services/Departamento/departamento.service';
import Swal from 'sweetalert2';
// 
@Component({
  selector: 'app-listar-departamentos',
  templateUrl: './listar-departamentos.component.html',
  styleUrls: ['./listar-departamentos.component.css']
})
export class ListarDepartamentosComponent{
  @ViewChild('modalContent') modalContent: ElementRef<any> | null = null;
  departamentos: any[]=[]
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
  handleCloseModal(): void {
    this.closeModal();
  }

  // listarDepartamentos() {
  //   this.departamentoService.obtenerDepartamentos().subscribe(
  //     (response) => {
  //       this.departamentos=response[0]
  //       console.log('Estos son los departamentos', this.departamentos);
        
  //          Swal.fire({
  //         position: "top-end",
  //         icon: "success",
  //         title: "!Departamentos listados correctamente"+ this.departamentos,
  //         showConfirmButton: false,
  //         timer: 1500
  //       });
  //     },
  //     (error) => {
  //       console.log('Error al obtener Departamentos', error);
  //       Swal.fire({
  //         position: "top-end",
  //         icon: "warning",
  //         title: "!No se pueden listar los Departamentos",
  //         showConfirmButton: false,
  //         timer: 1500
  //       });
  //     }
  //   );
  // }
  listarDepartamentos(): void {
    this.departamentoService.obtenerDepartamentos().subscribe(response => {
      this.departamentos = response.data[0];
    });
  }

  actualizarDepartamentos(): void {
    this.listarDepartamentos();
  }
  verDepartamneto():void{
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
    this.departamentosFiltrados = this.departamentos.filter((departamento) => {
      return departamento && departamento.departamento && departamento.departamento.toLowerCase().includes(this.terminoBusqueda.toLowerCase());
    });
    this.noResultados = this.departamentosFiltrados.length === 0;
  }

  filtrarUsuarios(): void {
    if (this.terminoBusqueda.trim() !== '') {
      this.departamentosFiltrados = this.departamentos.filter((departamentos) => {
        return (
          departamentos.departamento.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) 
      
        );
      });
      this.noResultados = this.departamentosFiltrados.length === 0;
    } else {
      this.departamentosFiltrados = [...this.departamentos]; // Mostrar todos los usuarios si el término de búsqueda está vacío
      this.noResultados = false;
    }
  }
}
