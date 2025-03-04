import { Component, ViewChild, ElementRef } from '@angular/core';
import { ZonaService } from 'app/services/zona/zona.service'; 
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { EditarZonaComponent } from 'app/views/modals/editar-zona/editar-zona.component';

@Component({
  selector: 'app-administrar-zona',
  templateUrl: './administrar-zona.component.html',
  styleUrls: ['./administrar-zona.component.css']
})
export class AdministrarZonaComponent {
  @ViewChild('modalContent') modalContent: ElementRef<any> | null = null;
  zona: any[] = []; // Inicializar como array vacío
 
  terminoBusqueda: string = '';

  showModalEditar: boolean = false;
  zonaSeleccionada: any = {}
  
  mostrarModalCrear: boolean = false; 
  mostrarModalEditar: boolean = false;
  mostrarModalVer: boolean = false;
  showModalVer: boolean = false;
  idzona : number | null= null;
  noResultados: boolean = false; 


  constructor(private zonaservice: ZonaService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.obtenerZonas();
  }
 

  obtenerZonas() {
    this.zonaservice.getZona().subscribe(
      (response) => {
        this.zona = response.data; 
        console.log('Zona ', this.zona);
        this.filtrarZona();        
      },
      (error) => {
        console.log('Error al obtener Zonas', error);       
      }
    )
  }

  editarZona(zona: any): void {
    const dialogRef = this.dialog.open(EditarZonaComponent, {
      width: '400px',
      data: { zona }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.obtenerZonas();
      }
    });
  }




  EliminarZona(idzona: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.zonaservice.eliminarZona(idzona).subscribe(
          () => {
            Swal.fire(
              '¡Eliminado!',
              'La Zona ha sido eliminada correctamente.',
              'success'
            );
            this.obtenerZonas();
          },
          (error) => {
            Swal.fire(
              '¡Error!',
              'Ocurrió un error al intentar eliminar la Zona.',
              'error'
            );
            console.error('Error al eliminar zona:', error);
          }
        );
      }
    });
  }
  
  filtrarZona(): any[] {
    const zonasfiltradas = this.zona.filter((zona) => {
      return zona.Nombre_zona.toLowerCase().includes(this.terminoBusqueda.toLowerCase());
    });
    this.noResultados = zonasfiltradas.length === 0;
    return zonasfiltradas;
  }

}
