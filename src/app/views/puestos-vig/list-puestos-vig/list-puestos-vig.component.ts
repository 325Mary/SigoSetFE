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
  puestos: any[] = [];
  puestoData: PuestosVigilanciaComponent;
  errorMessage: string = '';
  dataSource: MatTableDataSource<any>; // Agrega esta propiedad

  puestoElegido: any = {}

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


  actualizarpuesto(): void {
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
    Swal.fire({
      title: '¿Eliminar Puesto?',
      text: '¿Estás seguro de que deseas eliminar este Puesto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result)=>{
      if (result.isConfirmed) {
        // Si el usuario confirma, llamar al servicio para eliminar la vigilancia electrónica
        this.puestosService.eliminarPuesto(idpuesto_vigilancia).subscribe(
          () => {
            // Actualizar la lista de vigilancias electrónicas después de eliminar
            this.obtenerPuestos();
            Swal.fire('Eliminado', 'La vigilancia electrónica ha sido eliminada', 'success');
          },
          error => {
            console.error('Error al eliminar la vigilancia electrónica:', error);
            Swal.fire('Error', 'No se pudo eliminar la vigilancia electrónica', 'error');
          }
        );
      }
    })


 
}
  
  }

  
  







