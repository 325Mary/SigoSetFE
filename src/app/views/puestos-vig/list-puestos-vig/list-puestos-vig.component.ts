import { Component, OnInit } from '@angular/core';
import { PuestosVigilanciaService } from '../../../services/puestosvigilancia/puestosVig.service';
import { MatTableDataSource } from '@angular/material/table';
import { PuestosVigilanciaComponent } from '../crear-puestos-vig/puestosVig.component'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-puestos-vig',
  templateUrl: '../list-puestos-vig/list-puestos-vig.component.html',
  styleUrls: ['../list-puestos-vig/list-puestos-vig.component.css']
})
export class ListPuestosVigComponent implements OnInit {
  puestos: [];
  puestoData: PuestosVigilanciaComponent;
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
        this.puestos = data.data;
        this.dataSource.data = this.puestos;
        console.log(this.puestoData, 'estsos son');
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Puestos Listados",
          showConfirmButton: false,
          timer: 1500
        });
         // Actualiza el dataSource con los datos obtenidos
      },
      (error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "No hay Puestos",
          showConfirmButton: false,
          timer: 1500
        });
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
    this.puestosService.eliminarPuesto(id).subscribe(
      (data) => {
        this.obtenerPuestos();
      },
      (error) => {
        this.errorMessage = 'Error al eliminar el puesto';
      }
    );
  }
}
