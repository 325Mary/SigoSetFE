
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ObligacionContractualService } from 'app/services/obligacionContractual/obligacion-contractual.service';
import { EditarObligacionModalComponent } from 'app/views/modals/editarObligacionesContractuales/editar-obligacion/editar-obligacion.component';
import { VerObligacionModalComponent } from 'app/views/modals/verObligacionesContractuales/ver-obligacion/ver-obligacion.component';

@Component({
  selector: 'app-administrar-obligacion',
  templateUrl: './administrar-obligacion.component.html',
  styleUrls: ['./administrar-obligacion.component.css']
})
export class AdministrarObligacionComponent implements OnInit {
  obligaciones: any[] = [];
  pageSize: number = 10; // Número de usuarios por página
  currentPage: number = 1; // Página actual
  terminoBusqueda: string = '';
  noResultados: boolean = false;

  constructor(private obligacionService: ObligacionContractualService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.obtenerObligaciones();
  }

  setPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  // Función para obtener los números de página disponibles
  getPages(): number[] {
    const pageCount = Math.ceil(this.obligaciones.length / this.pageSize);
    return Array(pageCount).fill(0).map((x, i) => i + 1);
  }
  obtenerObligaciones(): void {
    this.obligacionService.obtenerObligacionesContractuales().subscribe(
      data => {
        this.obligaciones = data;
        this.filtrarObligaciones()
        console.log('cntractura:', this.obligaciones)
      },
      error => {
        alert('Error al obtener las obligaciones contractuales.');
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
  filtrarObligaciones(): any[] {
    const obligacionfiltrada = this.obligaciones.filter((obligacion) => {
      return obligacion.obligacion.toLowerCase().includes(this.terminoBusqueda.toLocaleLowerCase())
    });
    this.noResultados= obligacionfiltrada.length ===0;
    return obligacionfiltrada;
  }

  eliminarObligacion(idobligaciones_contractuales: number): void {
    if (confirm('¿Estás seguro de eliminar esta obligación?')) {
      this.obligacionService.eliminarObligacionContractualPorId(idobligaciones_contractuales).subscribe(
        response => {
          alert('Obligación contractual eliminada exitosamente.');
          this.obtenerObligaciones();
        },
        error => {
          alert('Error al eliminar la obligación contractual.');
        }
      );
    }
  }
}
