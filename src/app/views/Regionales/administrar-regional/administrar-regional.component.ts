import { Component, OnInit } from '@angular/core';
import { RegionalService } from '../../../services/regional/regional.service';
import Swal from 'sweetalert2';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { log } from 'console';

@Component({
  selector: 'app-administrar-regional',
  templateUrl: './administrar-regional.component.html',
  styleUrls: ['./administrar-regional.component.css']
})
export class AdministrarRegionalComponent implements OnInit {

  @ViewChild('modalContent') modalContent: ElementRef<any> | null = null;
  errorMessage: string = '';
  message: 'help'
  showModal: boolean = false;
  showModal1: boolean = false;
  regionales: any[];
  regional_seleccionada: any = {} // Define regionales como un arreglo de objetos del tipo Regional
  verRegional: boolean = false
  editarRegional: boolean = false
  constructor(private regionalService: RegionalService) { }

  ngOnInit(): void {
    this.listarRegionales(); // Llama al método para listar regionales al inicializar el componente
  }

  closeModal(): void {
    this.showModal = false;
    this.verRegional = false;
    this.editarRegional = false;
  }

  handleCloseModal(): void {
    this.closeModal();
  }
  //Ver regional
  modalverRegional(regionales :any):void{
    this.regional_seleccionada = regionales;
    this.showModal = true;
  }
 //editar regional
  modaleditarRegional(regionales:any): void{
    this.regional_seleccionada = regionales;
     console.log('regional', this.regional_seleccionada);

  }
 //eliminar regional  
 eliminarRegional(idregional :number):void{
   // Mostrar un cuadro de confirmación antes de eliminar la empresa
   Swal.fire({
    title: '¿Estás seguro?',
    text: '¡No podrás revertir esto!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminarlo',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      // Llamar al servicio para eliminar la empresa
      this.regionalService.deleteRegionalById(idregional).subscribe(
        () => {
          // Mostrar un mensaje de éxito después de eliminar la empresa
          Swal.fire(
            '¡Eliminado!',
            'La regional ha sido eliminada correctamente.',
            'success'
          );
          // Actualizar la lista de empresas después de la eliminación
          this.listarRegionales();
        },
        (error) => {
          // Mostrar un mensaje de error si ocurre algún problema durante la eliminación
          Swal.fire(
            '¡Error!',
            'Ocurrió un error al intentar eliminar la regional.',
            'error'
          );
          console.error('Error al eliminar regional:', error);
        }
      );
    }
  });
 }
 
  listarRegionales(): void {
    this.regionalService.getAllRegionals().subscribe(
      (regionales) => {
        regionales = regionales; // Asigna los datos recibidos a la propiedad this.regionales
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Regionales Listadas",
          showConfirmButton: false,
          timer: 1500
        });
        console.log(regionales[0]); // Asegúrate de acceder a this.regionales
      },
      error => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "No hay Regionales - Error",
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }
  
}
