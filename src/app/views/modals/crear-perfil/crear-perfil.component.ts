import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilService } from '../../../services/usuario/perfil.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-perfil',
  templateUrl: './crear-perfil.component.html',
  styleUrls: ['./crear-perfil.component.css']
})
export class CrearPerfilComponent implements OnInit {
  @Output() perfilCreado: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  nuevoPerfil: any = {};

  constructor(private perfilService: PerfilService, private router: Router) { }

  ngOnInit(): void {
  }

  crearPerfil() {
    if(this.validarPerfil()){
       this.perfilService.crearPerfil(this.nuevoPerfil).subscribe(
      (response) => {
        console.log('Perfil creado exitosamente:', response.data);
        this.nuevoPerfil = {}; // Limpiar datos del nuevo perfil
        this.perfilCreado.emit(); // Emitir evento de perfil creado
        this.closeModal.emit(); // Emitir evento de cierre de modal

        // Mostrar Sweet Alert de éxito
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Perfil creado exitosamente'
        }).then(() => {
          // Redirigir a otra vista después de que el usuario cierre el Sweet Alert
          this.router.navigate(['/AdministrarPerfiles']);
        });
      },
      (error) => {
        console.error('Error al crear perfil:', error);

        // Obtener el mensaje de error del objeto error
        let errorMessage = 'Ocurrió un error al crear el perfil. Por favor, inténtalo de nuevo más tarde.';
        if (error && error.error && error.error.message) {
          errorMessage = error.error.message;
        }

        // Mostrar Sweet Alert de error con el mensaje específico
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: errorMessage
        });
      }
    );
    }
   
  }
  validarPerfil():boolean{
   return(this.nuevoPerfil.perfil);
  }

  close(): void {
    this.closeModal.emit();
    // this.router.navigate(['/dashboard']);
  }
}
