import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sedes } from 'app/models/sedes/sedes';
import { SedesService } from 'app/services/sedes/sedes.service';
import { EditarSedeComponent } from 'app/views/modals/editar-sede/editar-sede.component';
import { VerSedeComponent } from 'app/views/modals/ver-sede/ver-sede.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-sedes',
  templateUrl: './listar-sedes.component.html',
  styleUrls: ['./listar-sedes.component.css']
})
export class ListarSedesComponent implements OnInit {
  sedes: any[] = [];
  sedeFiltrada: Sedes[] = [];
  terminoBusqueda: string = '';
  noResultados: boolean = false;
  pageSize: number = 10;
  currentPage: number = 1;

  constructor(private sedeService: SedesService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.obtenerSedes();
  }

  obtenerSedes(): void {
    this.sedeService.obtenerSedes().subscribe(data => {
      this.sedes = data;
      console.log(this.sedes)
      this.filtrarSedes(); // Inicializa los datos filtrados
    }, error => {
      console.error('Error al obtener las sedes:', error);
    });
  }

  editarSede(sede: any): void {
    const dialogRef = this.dialog.open(EditarSedeComponent, {
      width: '400px',
      data: { sede }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.obtenerSedes();
      }
    });
  }

  verSede(sede: any): void {
    this.dialog.open(VerSedeComponent, {
      width: '400px',
      data: { sede }
    });
  }

  eliminarSede(idsede_formacion: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sedeService.eliminarSede(idsede_formacion).subscribe(
          () => {
            Swal.fire(
              '¡Eliminado!',
              'La Sede ha sido eliminada correctamente.',
              'success'
            );
            this.obtenerSedes();
          },
          (error) => {
            Swal.fire(
              '¡Error!',
              'Ocurrió un error al intentar eliminar la Sede.',
              'error'
            );
            console.error('Error al eliminar Sede:', error);
          }
        );
      }
    });
  }

  filtrarSedes(): void {
    if (this.terminoBusqueda.trim() !== '') {
      this.sedeFiltrada = this.sedes.filter((sede) => {
        return (
          sede.sede_formacion.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
          sede.dir_sede_formacion.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
          sede.telefono_sedef.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
          sede.email_sedef.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
        );
      });
    } else {
      this.sedeFiltrada = [...this.sedes];
    }
    this.noResultados = this.sedeFiltrada.length === 0;
    this.currentPage = 1;
  }

  pageChange(event: number): void {
    this.currentPage = event;
  }

}
