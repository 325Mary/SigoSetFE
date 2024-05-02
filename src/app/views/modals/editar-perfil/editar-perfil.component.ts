import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PerfilService } from '../../../services/usuario/perfil.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent {
  @Input() perfilSeleccionado: any; 
  @Output() closeModal = new EventEmitter<void>();
  @Output() perfilActualizado = new EventEmitter<void>();

  constructor(private perfilService: PerfilService,) { }
  actualizarPerfil(): void {
    this.perfilService.editarPerfil(this.perfilSeleccionado.idperfil, this.perfilSeleccionado).subscribe(
      response => {
        console.log('Perfil actualizado:', response);
        // Puedes realizar alguna acción adicional después de actualizar el perfil, como cerrar el modal
        this.closeModal.emit();
        this.perfilActualizado.emit();
      },
      error => {
        console.error('Error al actualizar el perfil:', error);
        // Manejo de errores, si es necesario
      }
    );
  }
  close(): void {
    this.closeModal.emit();
  }
}
