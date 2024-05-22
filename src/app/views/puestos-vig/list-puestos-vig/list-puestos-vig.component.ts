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
  puestos: any[];
  puestoData: PuestosVigilanciaComponent;
  errorMessage: string = '';
  dataSource: MatTableDataSource<any>; // Agrega esta propiedad

  puestoElegido : any = {}

  showModal: boolean = false;
  showModal1: boolean = false;

  mostrarModalCrear: boolean = false; 
  mostrarModalEditar: boolean = false;
  
  constructor(private puestosService: PuestosVigilanciaService) {
    this.dataSource = new MatTableDataSource<any>(); // Inicializa el dataSource
  }
  
  ngOnInit(): void {
    this.obtenerPuestos();
  }


  actualizarpuesto():void{
    this.obtenerPuestos();
  }


  closeModal(): void {
    this.showModal = false;
    this.mostrarModalCrear = false;
    this.mostrarModalEditar = false;
  }

  handleCloseModal(): void {
    this.closeModal();
  }

  abrirModalVerPuesto(puesto: any): void {
    this.puestoElegido = puesto;
    this.showModal = true;
  }

  abrirModalEditar(puesto: any): void {
    this.puestoElegido = puesto;
    console.log('puesto', this.puestoElegido)
    this.mostrarModalEditar = true;
  }

  obtenerPuestos(): void {
    this.puestosService.obtenerPuestos().subscribe(
      (response) => {
        this.puestos = response.data[0];
        this.dataSource.data = this.puestos;
        console.log(this.puestos, 'estsos son');
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


  abrirModaleliminarPuesto(idpuesto_vigilancia: number): void {
    this.puestosService.eliminarPuesto(idpuesto_vigilancia).subscribe(
      () => {
        Swal.fire(
          '¡Eliminado!',
          'La empresa ha sido eliminada correctamente.',
          'success'
        );
        // Actualizar la lista de empresas después de la eliminación
        this.obtenerPuestos();
      },
      (error) => {
        Swal.fire(
          '¡Error!',
          'Ocurrió un error al intentar eliminar la empresa.',
          'error'
        );
        console.error('Error al eliminar empresa:', error);
      }
    );
  }

  
  






}
