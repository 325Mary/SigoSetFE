
import { Component, OnInit,  AfterViewInit,ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { ModuloService, } from '../../../services/modulos/modulos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-modulo',
  templateUrl: './lista-modulos.component.html',
  styleUrls: ['./lista-modulos.component.css']
})
export class ListaModuloComponent  {
  @ViewChild('modalContent') modalContent: ElementRef<any> | null = null;
  showModal: boolean = false;
  mostrarModalEditar: boolean = false; 
  ModuloSeleccionado: any = {}
  modulos: any[] = [];

  constructor(private moduloService: ModuloService) {}

  ngOnInit(): void {
    this.obtenerModulos();
  }

  obtenerModulos() {
    this.moduloService.obtenerModulos().subscribe(
      (response: any) => {
        this.modulos = response.data[0];
      },
      error => {
        console.error('Error al obtener los módulos:', error);
      }
    );
  }

  eliminarModulo(idmodulo: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.moduloService.eliminarModulo(idmodulo).subscribe(
          () => {
            this.modulos = this.modulos.filter(modulo => modulo.idmodulo !== idmodulo);
            Swal.fire(
              'Eliminado!',
              'El módulo ha sido eliminado.',
              'success'
            );
          },
          error => {
            Swal.fire(
              'Error!',
              'Hubo un problema al eliminar el módulo.',
              'error'
            );
            console.error('Error al eliminar el módulo:', error);
          }
        );
      }
    });
  }


  closeModal(): void {
    this.showModal = false;
    this.mostrarModalEditar = false;
  }
  
  abrirModalEditar(item: any): void {
    console.log('Item seleccionado:', item);
    this.ModuloSeleccionado = item;
    this.mostrarModalEditar = true;
    console.log('Centro seleccionado asignado en el padre:', this.ModuloSeleccionado);
  }
 
  handleCloseModal(): void {
    this.mostrarModalEditar = false;
  }
}
