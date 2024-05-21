
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ObligacionContractualService } from 'app/services/obligacionContractual/obligacion-contractual.service'; 
import { EditarObligacionComponent } from 'app/views/modals/editarObligacionesContractuales/editar-obligacion/editar-obligacion.component';  
import { VerObligacionComponent } from 'app/views/modals/verObligacionesContractuales/ver-obligacion/ver-obligacion.component'; 

@Component({
  selector: 'app-administrar-obligacion',
  templateUrl: './administrar-obligacion.component.html',
  styleUrls: ['./administrar-obligacion.component.css']
})
export class AdministrarObligacionComponent implements OnInit {
  obligaciones: any[] = [];

  constructor(private obligacionService: ObligacionContractualService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.obtenerObligaciones();
  }

  obtenerObligaciones(): void {
    this.obligacionService.obtenerObligacionesContractuales().subscribe(
      data => {
        this.obligaciones = data;
      },
      error => {
        alert('Error al obtener las obligaciones contractuales.');
      }
    );
  }

  editarObligacion(obligacion: any): void {
    const dialogRef = this.dialog.open(EditarObligacionComponent, {
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
    this.dialog.open(VerObligacionComponent, {
      width: '400px',
      data: { obligacion }
    });
  }

  eliminarObligacion(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta obligación?')) {
      this.obligacionService.eliminarObligacionContractualPorId(id).subscribe(
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
