import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ObligacionesContratistaService } from 'app/services/obligacionContratista/obligaciones-contratista.service'; 
import { EditarObliContratistaComponent } from 'app/views/modals/editar-obli-contratista/editar-obli-contratista.component';   
import { VerObliContratistaComponent } from 'app/views/modals/ver-obli-contratista/ver-obli-contratista.component';  
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listar-obligacion',
  templateUrl: './listar-obligacion.component.html',
  styleUrls: ['./listar-obligacion.component.css']
})
export class ListarObligacionContratistaComponent  {
  obligaciones: any[] = [];
  obligacionfiltrada : any[]=[]
  terminoBusqueda: string = '';
  noResultados: boolean = false;
  pageSize: number = 10;
  currentPage: number = 1;

  constructor(private obligacionService: ObligacionesContratistaService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.obtenerObligaciones();
  }

  obtenerObligaciones(): void {
    this.obligacionService.obtenerObligacionesContratista().subscribe(
      data => {
        this.obligaciones = data.data[0];
        this.filtrarObligaciones()
        console.log('obligacion:', this.obligaciones)    
      },
      error => {
        console.log('Error al obtener las obligaciones contractuales.'+ error);
      }
    );
  }
  editarObligacion(obligacion: any): void {
    const dialogRef = this.dialog.open(EditarObliContratistaComponent, {
      width: '400px',
      data: { obligacion }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.obtenerObligaciones();
      }
    });
  }
  verObligacion(obligacion: any): void {
    this.dialog.open(VerObliContratistaComponent, {
      width: '400px',
      data: { obligacion }
    });
  }
  eliminarObligacion(idobligaciones_contratista: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.obligacionService.EliminarObligacionContratista(idobligaciones_contratista).subscribe(
          () => {
            Swal.fire(
              '¡Eliminado!',
              'La Obligacion ha sido eliminada correctamente.',
              'success'
            );
            this.obtenerObligaciones();
          },
          (error) => {
            Swal.fire(
              '¡Error!',
              'Ocurrió un error al intentar eliminar la Obligacion.',
              'error'
            );
            console.error('Error al eliminar zona:', error);
          }
        );
      }
    });
  }

  filtrarObligaciones(): void {
    if (this.terminoBusqueda.trim() !== '') {
   this.obligacionfiltrada= this.obligaciones.filter((obligaciones) => {
      return obligaciones.obligacion_contratista.toLowerCase().includes(this.terminoBusqueda.toLocaleLowerCase())
    });
    this.noResultados= this.obligacionfiltrada.length === 0;
    this.currentPage= 1
   
  }else{
    this.obligacionfiltrada =[...this.obligaciones]
  }
  }


  pageChange(event: number): void {
    this.currentPage = event;
  }

}
