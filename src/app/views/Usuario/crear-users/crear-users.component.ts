import { Component } from '@angular/core';
import { LoginService } from '../../../services/usuario/login.service';
import { PerfilService } from '../../../services/usuario/perfil.service';
import {CentroFormacionService} from '../../../services/centro-formacion/centro-formacion.service'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
  centrosF: any[] = [];
  mostrarMensaje: boolean = false; 
  constructor(private authservice: LoginService, private perfilService: PerfilService, private centroS: CentroFormacionService,  private router: Router,) {}

  ngOnInit(): void {
    this.obtenerPerfiles();
    this.obtenerCentros()
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
  obtenerCentros() {
    this.centroS.getCentrosFormacion().subscribe(
      (response: any) => {
        console.log(response); // Verifica que los datos se estén recuperando correctamente
        if (response && response.data && response.data.length > 0) {
          this.centrosF = response.data; // Asigna el primer elemento del primer array
        } else {
          console.error('No se han recuperado centros de formacion');
        }
      },
      error => {
        console.error('Error al recuperar centros de formacion :', error);
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
          this.router.navigateByUrl('/listarUsuarios')
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
  

  verificarEmail() {
    // Verifica si el campo de email tiene algún valor y si falta el símbolo '@'
    this.mostrarMensaje = this.registroData.email_usuario && !this.validarEmail(this.registroData.email_usuario);
  }
  
  validarEmail(email: string): boolean {
    // Verifica si el email contiene el símbolo '@'
    return email.includes('@');
  }
  
  validarFormulario(): boolean {
    // Realiza la validación del formulario aquí, por ejemplo:
    const emailValido = this.validarEmail(this.registroData.email_usuario);
    return (
      this.registroData.idperfil &&
      this.registroData.idcentro_formacion &&
      this.registroData.identificacion &&
      this.registroData.nombre_usuario &&
      this.registroData.apellido_usuario &&
      this.registroData.telefono_usuario &&
      emailValido && // Email válido
      this.registroData.estado
    );
  }
  
  

}
