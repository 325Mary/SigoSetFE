import { Component, ViewChild, ElementRef } from '@angular/core';
import { VigilanciaElectronicaService } from "../../../services/PuestosElectronicos/vigilancia-electronica.service";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listar-ve',
  templateUrl: './listar-ve.component.html',
  styleUrls: ['./listar-ve.component.css']
})
export class ListarVEComponent {
  @ViewChild('modalContent') modalContent: ElementRef<any> | null = null;

  vigilanciasElectronicas: any[] = [];
  vigiElSeleccionada: any = {};
  showModal: boolean = false;
  mostrarModalEditar: boolean = false;
  mostrarModalCrear: boolean = false; 

  constructor(private vigilanciaService: VigilanciaElectronicaService) { }

  ngOnInit(): void {
    this.obtenerVigilanciasElectronicas();
  }

  obtenerVigilanciasElectronicas(): void {
    this.vigilanciaService.obtenerVigilaciaElectronica()
      .subscribe(
        response => {
          this.vigilanciasElectronicas = response.data[0]; // Asigna los datos obtenidos al arreglo
          console.log('listVe:', this.vigilanciasElectronicas )
        },
        error => {
          console.error('Error al obtener las vigilancias electrónicas', error);
        }
      );
  }

  actualizarList(): void {
    this.obtenerVigilanciasElectronicas(); // Llama al método para obtener los perfiles nuevamente
  }
  closeModal(): void {
    this.showModal = false;
    this.mostrarModalEditar = false;
    this.mostrarModalCrear = false
  }
  
  handleCloseModal(): void {
    this.closeModal();
  }
  
  
  
  abrirModalEditar(vigilancia: any): void {
    this.vigiElSeleccionada = vigilancia;
    console.log('vigilancia', this.vigiElSeleccionada)
    this.mostrarModalEditar = true;
  }

  eliminarVigilancia(id: number): void {
    // Mostrar un mensaje de confirmación utilizando SweetAlert2
    Swal.fire({
      title: '¿Eliminar vigilancia electrónica?',
      text: '¿Estás seguro de que deseas eliminar esta vigilancia electrónica?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, llamar al servicio para eliminar la vigilancia electrónica
        this.vigilanciaService.eliminarVigilaciaElectronica(id).subscribe(
          () => {
            // Actualizar la lista de vigilancias electrónicas después de eliminar
            this.obtenerVigilanciasElectronicas();
            Swal.fire('Eliminado', 'La vigilancia electrónica ha sido eliminada', 'success');
          },
          error => {
            console.error('Error al eliminar la vigilancia electrónica:', error);
            Swal.fire('Error', 'No se pudo eliminar la vigilancia electrónica', 'error');
          }
        );
      }
    });
}

abrirModalCrear(): void {
  this.mostrarModalCrear = true; 
}
}