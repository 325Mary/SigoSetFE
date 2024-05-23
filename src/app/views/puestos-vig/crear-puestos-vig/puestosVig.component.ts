
import { Component, OnInit } from '@angular/core';
import { PuestosVigilanciaService } from '../../../services/puestosvigilancia/puestosVig.service';
import { CrearContratoComponent } from 'app/views/modals/crear-contrato/crear-contrato.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-puestos-vigilancia',
  templateUrl: '../crear-puestos-vig/puestosVig.component.html',
  styleUrls: ['./../crear-puestos-vig/puestosVig.component.css']
})
export class PuestosVigilanciaComponent{
  nuevopuesto: any = {};
  errorMessage: string = '';

  constructor(private router:Router, private puestosService: PuestosVigilanciaService) { }


  ngOnInit(): void {
    this.obtenerPuestos();
  }

  crearPuesto() {
    this.actualizarCalculos(); // Actualizar los cálculos antes de crear el puesto
    this.puestosService.crearPuesto(this.nuevopuesto).subscribe(
      (response) => {
        console.log('Puesto Creado');
        this.nuevopuesto={}
        Swal.fire({
          title: '! Hecho ¡',
          text: 'Puesto creado con éxito',
          icon: 'success',
          timer: 3000
        }).then((response) => {
          if (response.isConfirmed) {
            this.router.navigate(['listarPuestosVig']);
          }
        });
        this.errorMessage = 'Puesto creado con éxito';
        console.log('Puesto creado');
      },
      (error) => {
        this.errorMessage = 'Error al crear el puesto';
        Swal.fire({
          title: '! Error ¡',
          text: 'No se pudo crear el Puesto',
          icon: 'warning',
          timer: 3000
        });
        console.error('Error al crear el puesto:', error); // Log error for debugging
      }
    );
  }

  obtenerPuestos(): void {
    this.puestosService.obtenerPuestos().subscribe(
      (data) => {
        this.nuevopuesto = data.data;
        console.log(data)
      },
      (error) => {   
        this.errorMessage = 'Error al obtener los puestos';
      }
    );
  }

  actualizarCalculos(): void {
    this.nuevopuesto.ays = this.nuevopuesto.tarifa_puesto *0.08;
    
    this.nuevopuesto.iva = (this.nuevopuesto.tarifa_puesto + this.nuevopuesto.ays)* 0.19;
    
    this.nuevopuesto.total = this.nuevopuesto.tarifa_puesto  + this.nuevopuesto.ays + this.nuevopuesto.iva;
  }

 




  editarPuesto(id: number, nuevoPuestoData: any): void {
    this.actualizarCalculos();
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
