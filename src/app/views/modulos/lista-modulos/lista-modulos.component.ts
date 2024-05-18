
import { Component, OnInit } from '@angular/core';
import { ModuloService, } from '../../../services/modulos/modulos.service';
import { DetalleModuloComponent } from '../detalle-modulo/detalle-modulo.component';
import { EditarModuloComponent } from '../editar-modulo/editar-modulo.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';

interface Modulo {
  idmodulo: number;
  id_modulo_padre: number;
  modulo: string;
  url_modulo: string;
  icono: string;
  orden: number;
  hijos: number | null;
}
@Component({
  selector: 'app-lista-modulo',
  templateUrl: './lista-modulos.component.html',
  styleUrls: ['./lista-modulos.component.css']
})
export class ListaModuloComponent implements OnInit {
  modulos: Modulo[] = [];
  selectedModulo: Modulo | null = null;
  errorMessage: string = '';

  //Borrar si es snesesario
  displayedColumns: string[] = ['idmodulo', 'modulo', 'url_modulo', 'icono', 'acciones']; // Replace with your desired column names
  //----------------------------------------------------------------------------------
  constructor(private moduloService: ModuloService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.obtenerModulos();
  }

  obtenerModulos(): void {
    this.moduloService.obtenerModulos().subscribe(
      (modulos) => {
        this.modulos = modulos;
      },
      (error) => {
        this.errorMessage = 'Error al obtener los módulos';
      }
    );
  }

  verDetalle(modulo: Modulo): void {
    this.dialog.open(DetalleModuloComponent, {
      width: '400px',
      data: { modulo }
    });
  }

  editarModulo(modulo: Modulo): void {
    const dialogRef = this.dialog.open(EditarModuloComponent, {
      width: '400px',
      data: { modulo }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.obtenerModulos();
      }
    });
  }


 obtenerModuloPorId(id: number): void {
    this.moduloService.obtenerModuloPorId(id).subscribe(
      (modulo) => this.selectedModulo = modulo,
      (error) => this.errorMessage = 'Error al obtener el módulo'
    );
  }
  

  eliminarModulo(id: number): void {
    if (confirm('¿Estás seguro de eliminar este módulo?')) {
      this.moduloService.eliminarModulo(id).subscribe(
        () => {
          this.obtenerModulos();
        },
        (error) => {
          this.errorMessage = 'Error al eliminar el módulo';
        }
      );
    }
  }


  

}
