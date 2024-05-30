import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MunicipioService } from 'app/services/Municipio/municipio.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { VerMunicipioComponent } from '../modals/ver-municipios/ver-municipios.component';  
import { EditMunicipioComponent } from '../modals/edit-municipios/edit-municipios.component'; 



@Component({
  selector: 'app-list-municipios',
  templateUrl: './list-municipios.component.html',
  styleUrls: ['./list-municipios.component.css']
})
export class ListMunicipiosComponent implements OnInit {
  @ViewChild('modalContent') modalContent:ElementRef<any> | null = null;
  municipios: any[] = [];
  municipiosFiltrados: any[] = [];
  terminoBusqueda: string = '';
  noResultados: boolean = false;
  municipioSeleccionado: any ={};
  mostrarModalEditar:boolean=false;
  mostrarModalVer: boolean=false;

  constructor(private municipioService: MunicipioService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.listarMunicipios();
  }

handleCloseModal():void{
  this.handleCloseModal();
}

  listarMunicipios() {
    this.municipioService.obtenerMunicipios().subscribe(
      (response) => {
        if (response && response.data) {
          this.municipios = response.data[0];
          this.municipiosFiltrados = response.data[0];
        } else {
          this.municipios = [];
          this.municipiosFiltrados = [];
        }
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "¡Municipios listados correctamente!",
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error) => {
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

  actualizarMunicipios(): void {
    this.listarMunicipios();
  }
  verMunicipio():void{
    this.listarMunicipios();
  }

  abrirModalVerMunicipio(idmunicipio: number): void {
    this.dialog.open(VerMunicipioComponent, {
      data: { idmunicipio }
    });
  }

 
  abrirModalEditarMunicipio(municipio: any): void {
    const dialogRef = this.dialog.open(EditMunicipioComponent, { data: { municipio } });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'Municipio actualizado') {
        this.listarMunicipios();
      }
    });
  }

  eliminarMunicipio(municipio:any): void {
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
    this.municipiosFiltrados = this.municipios.filter((municipio) => {
      return municipio && municipio.municipio && municipio.municipio.toLowerCase().includes(this.terminoBusqueda.toLowerCase());
    });
    this.noResultados = this.municipiosFiltrados.length === 0;
    if (this.noResultados) {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "No se encontraron municipios con el criterio de búsqueda.",
        showConfirmButton: false,
        timer: 1500
      });
  }
}
}
