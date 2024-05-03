import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../../services/usuario/login.service"
import { Router } from '@angular/router'; // Importar Router desde '@angular/router'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showPassword: boolean = false; // Propiedad para controlar si se muestra la contraseña o no
  passwordFocused: boolean = false;
  user = {
    email_usuario: '',
    password: ''
  };
  errorMessage: string = ''; // Propiedad para almacenar el mensaje de error

 
  constructor(private loginService: LoginService, private router: Router) { }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword; // Cambia el estado de la propiedad para mostrar/ocultar la contraseña
  }

  onSubmit() {
    this.loginService.iniciarSesion(this.user).subscribe(response => {
        console.log('Inicio de sesión exitoso', response);
        // Verificar si es el primer inicio de sesión
        if (response.firstLogin) {
          // Si es el primer inicio de sesión, navegar a la ruta para cambiar la contraseña
          this.router.navigate(['/cambiarPassword', response.userId]);
        } else {
          // Si no es el primer inicio de sesión, navegar al dashboard
          this.router.navigate(['/dashboard']);
        }
    }, error => {
      console.error('Error al iniciar sesión', error);
      if (error && error.error && error.error.error) {
        this.errorMessage = error.error.error;
      } else {
        this.errorMessage = 'Usuario y Contraseña incorrectos';
      }
      console.log('Mensaje de error:', this.errorMessage);       
    });
  }



}