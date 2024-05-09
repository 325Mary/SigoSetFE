import { Component, ViewChild, ElementRef } from '@angular/core';
import { EditarPerfilComponent } from '../../modals/editar-perfil/editar-perfil.component';
import { CrearPerfilComponent } from '../../modals/crear-perfil/crear-perfil.component'; // Importa el componente de creación de perfil
import { PerfilService } from '../../../services/usuario/perfil.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listar-perfiles',
  templateUrl: './listar-perfiles.component.html',
  styleUrls: ['./listar-perfiles.component.css']
})
export class ListarPerfilesComponent {

  @ViewChild('modalContent') modalContent: ElementRef<any> | null = null;
  perfiles: any[];
  showModal: boolean = false;
  perfilSeleccionado: any = {};
  mostrarModalCrear: boolean = false; 

  constructor(private perfilService: PerfilService,) { }

  ngOnInit(): void {
    this.obtenerPerfiles();
  }

  obtenerPerfiles() {
    this.perfilService.obtenerPerfiles().subscribe(
      (response) => {
        this.perfiles = response.data[0];
      },
      (error) => {
        console.error('Error al obtener perfiles:', error);
      }
    );
  }

  abrirModalEditar(perfil: any): void {
    this.perfilSeleccionado = { ...perfil }; // Copia el perfil seleccionado para evitar modificar directamente el objeto en la lista
    this.showModal = true; // Muestra la modal
  }

  actualizarPerfiles(): void {
    this.obtenerPerfiles(); // Llama al método para obtener los perfiles nuevamente
  }
  closeModal(): void {
    this.showModal = false;
    this.mostrarModalCrear = false;
  }

  handleCloseModal(): void {
    this.closeModal();
  }

  abrirModalCrear(): void {
    this.mostrarModalCrear = true; // Establece la bandera para mostrar el modal de creación de perfil
  }
  eliminarPerfil(idperfil: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez eliminado, no podrás recuperar este perfil.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#002543',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.perfilService.eliminarPerfil(idperfil).subscribe(
          () => {
            Swal.fire(
              '¡Eliminado!',
              'El perfil ha sido eliminado.',
              'success'
            );
            this.obtenerPerfiles(); // Vuelve a cargar la lista de perfiles después de eliminar
          },
          (error) => {
            console.error('Error al eliminar perfil:', error);
          }
        );
      }
    });
  }
  
  
}
