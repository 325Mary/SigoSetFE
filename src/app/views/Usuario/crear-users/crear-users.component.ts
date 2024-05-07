import { Component } from '@angular/core';
import { LoginService } from '../../../services/usuario/login.service';
import { PerfilService } from '../../../services/usuario/perfil.service';
import Swal from 'sweetalert2';


interface Perfil {
  idperfil: number;
  perfil: string;
}

@Component({
  selector: 'app-crear-users',
  templateUrl: './crear-users.component.html',
  styleUrls: ['./crear-users.component.css']
})
export class CrearUsersComponent {
  registroData: any = {
    idperfil: '',
    idcentro_formacion: '',
    identificacion: '',
    nombre_usuario: '',
    apellido_usuario: '',
    telefono_usuario: '',
    email_usuario: '',
    // password: '',
    estado: ''
  };
  perfiles: Perfil[] = [];

  constructor(private authservice: LoginService, private perfilService: PerfilService) {}

  ngOnInit(): void {
    this.obtenerPerfiles();
  }

  obtenerPerfiles() {
    this.perfilService.obtenerPerfiles().subscribe(
      (response: any) => {
        console.log(response); // Verifica que los datos se estén recuperando correctamente
        if (response && response.data && response.data.length > 0) {
          this.perfiles = response.data[0]; // Asigna el primer elemento del primer array
        } else {
          console.error('No se han recuperado perfiles');
        }
      },
      error => {
        console.error('Error al recuperar perfiles:', error);
      }
    );
  }

  onSubmit() {
    if (this.validarFormulario()) {
      this.authservice.registrarUsuario(this.registroData).subscribe(
        response => {
          // Registro exitoso, mostrar mensaje de éxito
          Swal.fire({
            icon: 'success',
            title: '¡Registro exitoso!',
            text: 'El usuario ha sido registrado correctamente.'
          });
          // Aquí puedes realizar cualquier otra acción necesaria después del registro exitoso
          console.log(response);
        },
        error => {
          // Captura el mensaje de error del back
          const errorBack = error.error ? error.error.message : 'Error desconocido';
  
          // Muestra el error en el Sweet Alert
          Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: errorBack
          });
  
          console.error('Error del back:', error);
        }
      );
    } else {
      console.error('Formulario no válido');
    }
  }
  

  validarFormulario(): boolean {
    // Realiza la validación del formulario aquí, por ejemplo:
    return (
      this.registroData.idperfil &&
      this.registroData.idcentro_formacion &&
      this.registroData.identificacion &&
      this.registroData.nombre_usuario &&
      this.registroData.apellido_usuario &&
      this.registroData.telefono_usuario &&
      this.registroData.email_usuario &&
      // this.registroData.password &&
      this.registroData.estado
    );
  }

}
