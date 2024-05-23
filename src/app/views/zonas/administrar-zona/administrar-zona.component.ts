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
  showModal: boolean = false;
  showModal1: boolean = false;

  terminoBusqueda: string = '';

  zonaSeleccionada: any = {}
  
  mostrarModalCrear: boolean = false; 
  mostrarModalEditar: boolean = false;
  mostrarModalVer: boolean = false;

  idzona : number | null= null;
  noResultados: boolean = false; // Inicializar como false


  constructor(private zonaservice: ZonaService) { }

  ngOnInit(): void {
    this.obtenerZonas();
  }
  actualizarZona(): void {
    this.obtenerZonas();
  }

  closeModal(): void {
    this.showModal = false;
    this.mostrarModalCrear = false;
    this.mostrarModalEditar = false;
  }
  
  handleCloseModal(): void {
    this.closeModal();
  }

  abrirModalVerZona(zona: any): void {
    this.zonaSeleccionada = zona;
    this.showModal = true;
    console.log('Modal abieto');
    
  }


  abrirModalEditar() {
    this.mostrarModalEditar = true;
  }

  abrirModalVer() {
    this.mostrarModalVer = true;
  }

  obtenerZonas() {
    this.zonaservice.getZona().subscribe(
      (response) => {
        this.zona = response.data; // Asignar directamente los datos recibidos
        console.log('Zona ', this.zona);
        this.filtrarZona(); // Filtrar zonas después de obtenerlas
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

  abrirModalEditarZona(zona: any): void {
    this.zonaSeleccionada = zona;
    console.log('Zonas: ', this.zonaSeleccionada);
    this.mostrarModalEditar = true;
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
