import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../../services/usuario/login.service";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-restablecer-password',
  templateUrl: './restablecer-password.component.html',
  styleUrls: ['./restablecer-password.component.css']
})
export class RestablecerPasswordComponent {
  email_usuario: string = '';
  codigo: string = '';
  nuevaContrasena: string ='';
  mostrarCodigoInput: boolean = false; // Variable para controlar la visibilidad del bloque de entrada del código

  constructor(private authService: LoginService, private router: Router) {}

  // Función para mostrar solo los primeros caracteres del correo
  get emailToShow(): string {
    const firstChars = this.email_usuario.substring(0, 5); // Mostrar los primeros 3 caracteres del correo
    const asterisks = '*'.repeat(this.email_usuario.length - 5); // Rellenar con asteriscos el resto del correo
    return firstChars + asterisks;
  }
  
  solicitarRestablecimiento() {
    this.authService.enviarCodigoRestablecimiento(this.email_usuario).subscribe(
      response => {
        console.log('Código de restablecimiento enviado:', response);
        // Manejar la respuesta según sea necesario (mostrar mensaje al usuario, redirigir, etc.)
        this.mostrarCodigoInput = true; // Mostrar el bloque de entrada del código después de enviar la solicitud
      },
      error => {
        console.error('Error al solicitar restablecimiento:', error);
        // Manejar el error (mostrar mensaje de error al usuario, etc.)
        Swal.fire({
          title: 'Error',
          text: 'Error al solicitar restablecimiento, correo no encontrado ',
          icon: 'error'
        });
      }
    );
  }

  resetPasswordhtml() {
    const nuevaContraseña = this.nuevaContrasena;
    this.authService.resetPassword(this.email_usuario, this.codigo, this.nuevaContrasena).subscribe(
      response => {
        console.log('Contraseña restablecida con éxito:', response);
        // Manejar la respuesta según sea necesario (mostrar mensaje al usuario, redirigir, etc.)
        this.router.navigate(['/']); 
        Swal.fire({
          title: 'Éxito',
          text: '¡Cambio de contraseña exitoso!',
          icon: 'success'
        });
      },
      error => {
        console.error('Error al restablecer contraseña:', error);
        // Manejar el error (mostrar mensaje de error al usuario, etc.)
        Swal.fire({
          title: 'Error',
          text: 'Error al restablecer contraseña ',
          icon: 'error'
        });
      }
    );
  }
  validatePassword(): string {
    const password = this.nuevaContrasena;
    if (password.length < 8) {
      return 'Débil';
    } else if (password.length < 12) {
      return 'Medio';
    } else {
      return 'Fuerte';
    }
  }

  passwordStrengthPercentage(): number {
    const password = this.nuevaContrasena;
    if (password.length < 8) {
      return (password.length / 8) * 100;
    } else if (password.length < 12) {
      return (password.length / 12) * 100;
    } else {
      return 100;
    }
  }
}