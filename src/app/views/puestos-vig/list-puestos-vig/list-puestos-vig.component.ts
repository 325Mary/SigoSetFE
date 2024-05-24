import { Component, OnInit } from '@angular/core';
import { PuestosVigilanciaService } from '../../../services/puestosvigilancia/puestosVig.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-puestos-vig',
  templateUrl: '../list-puestos-vig/list-puestos-vig.component.html',
  styleUrls: ['../list-puestos-vig/list-puestos-vig.component.css']
})
export class ListPuestosVigComponent implements OnInit {
  puestos: any[] = [];
  puestoData: any;
  errorMessage: string = '';
  dataSource: MatTableDataSource<any>; // Agrega esta propiedad

  constructor(private puestosService: PuestosVigilanciaService) {
    this.dataSource = new MatTableDataSource<any>(); // Inicializa el dataSource
  }

  ngOnInit(): void {
    this.obtenerPuestos();
  }

  obtenerPuestos(): void {
    this.puestosService.obtenerPuestos().subscribe(
      (data) => {
        this.puestos = data.data[0];
        this.dataSource.data = this.puestos; // Actualiza el dataSource con los datos obtenidos
        console.log('pv.', this.puestos)
      },
      (error) => {
        this.errorMessage = 'Error al obtener los puestos';
      }
    );
  }

  crearPuesto(puestoData: any): void {
    this.puestosService.crearPuesto(puestoData).subscribe(
      (data) => {
        this.obtenerPuestos();
      },
      (error) => {
        this.errorMessage = 'Error al crear el puesto';
      }
    );
  }

  editarPuesto(id: number, nuevoPuestoData: any): void {
    this.puestosService.editarPuesto(id, nuevoPuestoData).subscribe(
      (data) => {
        this.obtenerPuestos();
      },
      (error) => {
        this.errorMessage = 'Error al editar el puesto';
      }
    );
  }

  eliminarPuesto(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.puestosService.eliminarPuesto(id).subscribe(
          (data) => {
            this.obtenerPuestos();
            Swal.fire(
              '¡Eliminado!',
              'El puesto ha sido eliminado.',
              'success'
            );
          },
          (error) => {
            this.errorMessage = 'Error al eliminar el puesto';
            Swal.fire(
              '¡Error!',
              'Hubo un problema al eliminar el puesto.',
              'error'
            );
          }
        );
      }
    });
  }
  
}
