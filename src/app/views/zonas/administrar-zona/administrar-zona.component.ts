import { Component, ViewChild, ElementRef } from '@angular/core';
import { ZonaService } from 'app/services/zona/zona.service'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrar-zona',
  templateUrl: './administrar-zona.component.html',
  styleUrls: ['./administrar-zona.component.css']
})
export class AdministrarZonaComponent {
  @ViewChild('modalContent') modalContent: ElementRef<any> | null = null;
  zona: any[] = []; // Inicializar como array vacío
 
  terminoBusqueda: string = '';

  showModalEditar: boolean = false;
  zonaSeleccionada: any = {}
  
  mostrarModalCrear: boolean = false; 
  mostrarModalEditar: boolean = false;
  mostrarModalVer: boolean = false;
  showModalVer: boolean = false;
  idzona : number | null= null;
  noResultados: boolean = false; // Inicializar como false


  constructor(private zonaservice: ZonaService) { }

  ngOnInit(): void {
    this.obtenerZonas();
  }
  actualizarZona(): void {
    this.obtenerZonas();
  }
  verZona():void{
    this.obtenerZonas();
  }

  handleCloseModal(): void {
    this.closeModal();
  }

  closeModal(): void {
    this.showModalVer = false;
    this.mostrarModalCrear = false;
    this.mostrarModalEditar = false;
  }
  
 
  abrirModalVerZona(zona: any): void {
    this.zonaSeleccionada = zona;
    this.showModalVer = true;
    console.log('Modal abieto');
    
  }


  abrirModalEditar() {
    this.mostrarModalEditar = true;
  }
  abrirModalEditarZona(zona: any): void {
    this.zonaSeleccionada = zona;
    this.showModalEditar = true; // Cambia showModal a showModalEditar
  }
  
  

  abrirModalVer() {
    this.mostrarModalVer = true;
  }

  obtenerZonas() {
    this.zonaservice.getZona().subscribe(
      (response) => {
        this.zona = response.data; 
        console.log('Zona ', this.zona);
        this.filtrarZona(); 
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "!Zonas listadas correctamente¡",
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error) => {
        console.log('Error al obtener Zonas', error);
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: "!No se pueden listar las Zonas",
          showConfirmButton: false,
          timer: 1500
        });
      }
    )
  }


  EliminarZona(idzona: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.zonaservice.eliminarZona(idzona).subscribe(
          () => {
            Swal.fire(
              '¡Eliminado!',
              'La Zona ha sido eliminada correctamente.',
              'success'
            );
            this.obtenerZonas();
          },
          (error) => {
            Swal.fire(
              '¡Error!',
              'Ocurrió un error al intentar eliminar la Zona.',
              'error'
            );
            console.error('Error al eliminar zona:', error);
          }
        );
      }
    });
  }
  
  filtrarZona(): any[] {
    const zonasfiltradas = this.zona.filter((zona) => {
      return zona.Nombre_zona.toLowerCase().includes(this.terminoBusqueda.toLowerCase());
    });
    this.noResultados = zonasfiltradas.length === 0;
    return zonasfiltradas;
  }

}
