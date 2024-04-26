import { Component, OnInit } from '@angular/core';
import { PuestosVigilanciaService } from '../../services/puestosvigilancia/puestosVig.service';

@Component({
  selector: 'app-puestos-vigilancia',
  templateUrl: './puestosVig.component.html',
  styleUrls: ['./puestosVig.component.css']
})
export class PuestosVigilanciaComponent implements OnInit {
  puestos: any[] = [];
  puestoData: any;
  errorMessage: string = '';

  constructor(private puestosService: PuestosVigilanciaService) { }

  ngOnInit(): void {
    this.obtenerPuestos();
  }

  obtenerPuestos(): void {
    this.puestosService.obtenerPuestos().subscribe(
      (data) => {
        this.puestos = data.data;
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
