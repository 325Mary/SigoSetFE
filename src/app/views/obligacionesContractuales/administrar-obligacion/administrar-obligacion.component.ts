
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ObligacionContractualService } from 'app/services/obligacionContractual/obligacion-contractual.service'; 
import { EditarObligacionModalComponent } from 'app/views/modals/editarObligacionesContractuales/editar-obligacion/editar-obligacion.component';   
import { VerObligacionModalComponent } from 'app/views/modals/verObligacionesContractuales/ver-obligacion/ver-obligacion.component';  
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrar-obligacion',
  templateUrl: './administrar-obligacion.component.html',
  styleUrls: ['./administrar-obligacion.component.css']
})
export class AdministrarObligacionComponent {
  obligaciones: any[] = [];
  terminoBusqueda: string = '';
  noResultados: boolean = false;
  pageSize: number = 10;
  currentPage: number = 1;

  constructor(private obligacionService: ObligacionContractualService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.obtenerObligaciones();
  }
  setPage(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  getPages(): number[] {
    const pageCount = Math.ceil(this.obligaciones.length / this.pageSize);
    return Array(pageCount).fill(0).map((x, i) => i + 1);
  }

  obtenerObligaciones(): void {
    this.obligacionService.obtenerObligacionesContractuales().subscribe(
      data => {
        this.obligaciones = data;
        console.log('cntractura:', this.obligaciones)
        this.filtrarObligacion();
      },
      error => {
        alert('Error al obtener las obligaciones contractuales.'+ error);
      }
    );
  }

  editarObligacion(obligacion: any): void {
    const dialogRef = this.dialog.open(EditarObligacionModalComponent, {
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
    this.dialog.open(VerObligacionModalComponent, {
      width: '400px',
      data: { obligacion }
    });
  }

  eliminarObligacion(idobligaciones_contractuales: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.obligacionService.eliminarObligacionContractualPorId(idobligaciones_contractuales).subscribe(
          () => {
            Swal.fire(
              '¡Eliminado!',
              'La Zona ha sido eliminada correctamente.',
              'success'
            );
            this.obtenerObligaciones();
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

  filtrarObligacion(): any[] {
    const obligacionfiltradas = this.obligaciones.filter((obligacion_contractual) => {
      return obligacion_contractual.obligaciones_contractuales.toLowerCase().includes(this.terminoBusqueda.toLowerCase());
    });
    this.noResultados = obligacionfiltradas.length === 0;
    return obligacionfiltradas;
  }

}
