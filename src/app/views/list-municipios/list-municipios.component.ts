import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MunicipioService } from 'app/services/Municipio/municipio.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-list-municipios',
  templateUrl: './list-municipios.component.html',
  styleUrls: ['./list-municipios.component.css']
})
export class ListMunicipiosComponent implements OnInit {
  @ViewChild('modalContent') modalContent: ElementRef<any> | null = null;
  municipios: any[] = [];
  municipiosFiltrados: any[] = [];
  terminoBusqueda: string = '';
  noResultados: boolean = false;
  municipioSeleccionado: any = {};
  mostrarModalEditar: boolean = false;
  mostrarModalVer: boolean = false;
  pageSize: number = 10; 
  currentPage: number = 1;

  constructor(private municipioService: MunicipioService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.listarMunicipios();
  }

  listarMunicipios() {
    this.municipioService.obtenerMunicipios().subscribe(
      response => {
        // Asigna los municipios correctamente
        this.municipios = response.data[0]
        this.filtrarMunicipios();
        console.log('Municipios Listados',this.municipios);
      },
      error => {
        console.log('Error al obtener Municipios', error);
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: "¡No se pueden listar los Municipios!",
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }

  editarMunicipio(index: number): void {
    // Cambiar la propiedad 'editando' del objeto regional en la lista
    this.municipios[index].editando = true;
  }

  guardarCambios(index: number): void {
    // Enviar los datos actualizados al servidor
    const MunicipioEditado = this.municipios[index];
    this.municipioService.editarMunicipio(MunicipioEditado.iddepartamento, MunicipioEditado).subscribe(
      response => {
        console.log('Municipio actualizado exitosamente:', response);
        MunicipioEditado.editando = false;
        Swal.fire({
          title: "Accion completada!",
          text: "!Municipio Editado Correctamente!",
          icon: "success"
        });
      },
      error => {
        Swal.fire({
          title: "Accion Erronea!",
          text: "!Departamento No editado!",
          icon: "warning"
        });
      }
    );
  }
  
  eliminarMunicipio(municipio: any): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.municipioService.eliminarMunicipio(municipio.idmunicipio).subscribe(
          () => {
            Swal.fire(
              '¡Eliminado!',
              'El Municipio ha sido eliminado correctamente.',
              'success'
            );
            this.listarMunicipios();
          },
          (error) => {
            Swal.fire(
              '¡Error!',
              'Ocurrió un error al intentar eliminar el Municipio.',
              'error'
            );
            console.error('Error al eliminar municipio:', error);
          }
        );
      }
    });
  }

  filtrarMunicipios(): void {
    if (this.terminoBusqueda.trim() !== '') {
      this.municipiosFiltrados = this.municipios.filter((municipio) => {
        return(
        municipio.municipio.toLowerCase().includes(this.terminoBusqueda.toLocaleLowerCase())
        );
        
      });
    } else {
      this.municipiosFiltrados = [...this.municipios];
    }
    this.noResultados = this.municipiosFiltrados.length === 0;
    this.currentPage = 1; // Reiniciar la paginación al filtrar
  }

  pageChange(event: number): void {
    this.currentPage = event;
  }
}
