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
  pageSize: number = 10;
  currentPage: number = 1;
  errorMessage: string = '';

  constructor(private departamentoService: DepartamentoService) { }

  ngOnInit(): void {
    this.listarDepartamentos();
  }

  listarDepartamentos(): void {
    this.departamentoService.obtenerDepartamentos().subscribe(
      response => {
        this.departamentos = response.data[0]
        console.log('des:', this.departamentos);
        this.filtrarDep();
      },
      error => {
        console.error('Error al obtener los Departamentos:', error);
        this.errorMessage = 'Error al obtener las regionales. Por favor, inténtalo de nuevo más tarde.';
      }
    );
  }




  editarDepartamento(index: number): void {
    this.departamentos[index].editando = true;
  }

  guardarCambios(index: number): void {
    const departamentoEditado = this.departamentos[index];
    this.departamentoService.editarDepartamento(departamentoEditado.iddepartamento, departamentoEditado).subscribe(
      response => {
        console.log('Departamento editado correctamente', response);
        departamentoEditado.editando = false;
      },
      error => {
        console.log('No se pudo actualizar el departamento', error);
      }
    );
  }

  EliminarDepartamento(iddepartamento: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then(result => {
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
          error => {
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
      this.departamentosFiltrados = this.departamentos.filter((departamento) =>{
        return(
             departamento.departamento.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
        )
    });
      this.noResultados = this.departamentosFiltrados.length === 0;
      this.currentPage = 1; // Reiniciar la paginación al filtrar

    } else {
      this.departamentosFiltrados = [...this.departamentos];
    }

  }


  pageChange(event: number): void {
    this.currentPage = event;
  }
}
