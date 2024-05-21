import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import {CentroFormacionService} from '../../../services/centro-formacion/centro-formacion.service'
import {CentroFormacion} from '../../../models/centro-formacion/centro-formacion'
import { PuestosEXcentroService } from '../../../services/PuestosXcentro/puestos-excentro.service';
import {PuestosVXcentroService} from '../../../services/PuestosXcentro/puestos-vxcentro.service'

import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-centros-formacion',
  templateUrl: './lista-centros-formacion.component.html',
  styleUrls: ['./lista-centros-formacion.component.css']
})
export class ListaCentrosFormacionComponent implements OnInit {
  @ViewChild('modalContent') modalContent: ElementRef<any> | null = null;
  showModal: boolean = false;
  mostrarModalPuestos: boolean = false; 
centroSeleccionado: any = {}
  listaCentrosFormacion: CentroFormacion[] = []
  puestoVxCentro: any;
  puestoExCentro: any;

  constructor(private _centroFormacionService: CentroFormacionService,  private _puestosEXCentroService: PuestosEXcentroService,
    private _puestosVXCentroService: PuestosVXcentroService) { }
  pageSize: number = 10; // Número de usuarios por página
  currentPage: number = 1; // Página actual

  ngOnInit(): void {
    this.getListaCentrosFormacion();
  }
   
  getListaCentrosFormacion() {
  this._centroFormacionService.getCentrosFormacion().subscribe(data => {
    this.listaCentrosFormacion= data.data;
    console.log(this.listaCentrosFormacion)
    console.log( data.message)
  }, error => {
  });
   
}
  // Función para cambiar de página
  setPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  // Función para obtener los números de página disponibles
  getPages(): number[] {
    const pageCount = Math.ceil(this.listaCentrosFormacion.length / this.pageSize);
    return Array(pageCount).fill(0).map((x, i) => i + 1);
  }
eliminarCentroFormacion(id: any) {
  Swal.fire({
    title: 'Eliminar Centro de formación',
    text: 'Estas seguro que quieres eliminar este centro de formacion?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
  }).then((results) => {
    if (results.isConfirmed) {
      this._centroFormacionService.eliminarCentroFormacion(id).subscribe(data => {
        console.log(data )
        if (data.status == 'success') {
          this.getListaCentrosFormacion()
          Swal.fire(
            'Centro de formación Eliminado!',
            'El centro de formacion fue eliminado con exito',
            'success'
          )
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Error al eliminar el centro de formacion',
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
          }
          )
        }

      })

    }
  })

}
getPuestosVxCentro(idcentro_formacion: number) {
  this._puestosVXCentroService.obtenerPuestosVxCentro(idcentro_formacion).subscribe(data => {
      this.puestoVxCentro = data;
      console.log('Puestos Vx Centro:', this.puestoVxCentro);
  }, error => {
      console.error(error);
  });
}

getPuestosExCentro(idcentro_formacion: number) {
  this._puestosEXCentroService.obtenerPuestosExCentro(idcentro_formacion).subscribe(data => {
      this.puestoExCentro = data;
      console.log('Puestos Ex Centro:', this.puestoExCentro);
  }, error => {
      console.error(error);
  });
}

closeModal(): void {
  this.showModal = false;
  this.mostrarModalPuestos = false;
}

abrirModalVerPuestos(item: any): void {
  console.log('Item seleccionado:', item);
  this.centroSeleccionado = item;
  this.mostrarModalPuestos = true;
  console.log('Centro seleccionado asignado en el padre:', this.centroSeleccionado);
}


handleCloseModal(): void {
  this.mostrarModalPuestos = false;
}


actualizarLista(): void {
  this.getListaCentrosFormacion();
}


}



