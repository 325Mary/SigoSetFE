import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { ObligacionesContratoService } from '../../../services/obligacionesContrato/obligaciones-contrato.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-obligaciones',
  templateUrl: './listar-obligaciones.component.html',
  styleUrls: ['./listar-obligaciones.component.css']
})
export class ListarObligacionesComponent implements OnInit {
  @ViewChild('modalContent') modalContent: ElementRef<any> | null = null;
  showModal: boolean = false;
  obligacionSeleccionada: any = {};
  mostrarModalObligaciones: boolean = false; 
  obligaciones: any[] = [];
  editObligacionId: number | null = null;
  nuevaObligacion: string = '';
  mostrarModalEditar: boolean = false;
  mostrarModalCrear: boolean = false;

  constructor(
    private obligacionesContratoService: ObligacionesContratoService
  ) {}

  ngOnInit(): void {
    this.obtenerObligaciones();
  }

  obtenerObligaciones() {
    this.obligacionesContratoService.obtenerObligacionesContrato().subscribe(
      (response) => {
        this.obligaciones = response.data
        
        console.log('obligaciones', this.obligaciones);
      },
      (error) => {
        console.error('Error al obtener obligaciones:', error);
      }
    );
  }

 

  confirmarEliminacion(idobligaciones_contrato: number) {
    Swal.fire({
      title: '¿Está seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarObligacion(idobligaciones_contrato);
      }
    });
  }

  eliminarObligacion(idobligaciones_contrato: number) {
    this.obligacionesContratoService.EliminarObligacionContrato(idobligaciones_contrato).subscribe(
      (response) => {
        console.log('Obligación eliminada:', response);
        this.obtenerObligaciones(); // Actualizar la lista
      },
      (error) => {
        console.error('Error al eliminar la obligación:', error);
      }
    );
  }


  closeModal(): void {
    this.showModal = false;
    this.mostrarModalObligaciones = false;
    this.mostrarModalEditar = false;

  }
  abrirModalVerO(obligacion: any): void {
    this.obligacionSeleccionada = obligacion;
    this.mostrarModalObligaciones = true;
  }

  handleCloseModal(): void {
    this.obligacionSeleccionada = false;
    this.mostrarModalObligaciones = false;
    this.mostrarModalEditar = false;
    this.mostrarModalCrear =false
  }
  abrirModalEditar(obligacion: any): void {
    this.obligacionSeleccionada = obligacion;
    this.mostrarModalEditar = true;
  }

  abrirModalCrear():void{
    this.mostrarModalCrear =true
  }


  handleActualizarObligacion(obligacion: any): void {
    this.obtenerObligaciones();
    this.handleCloseModal();
  }

  actualizarObC():void{
    this.obtenerObligaciones();

  }
}
