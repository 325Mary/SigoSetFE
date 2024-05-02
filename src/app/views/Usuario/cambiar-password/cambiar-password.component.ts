import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {LoginService} from "../../../services/usuario/login.service";
import * as jwt_decode from "jwt-decode"; // Importa la librería para decodificar tokens JWT
import Swal from 'sweetalert2'; // Importa SweetAlert2


@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent {
  userId: string = '';
  newPassword: string = '';

  constructor(private route: ActivatedRoute, private signInUpService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
    });
  }

  validatePassword(): string {
    const password = this.newPassword;
    if (password.length < 8) {
      return 'Débil';
    } else if (password.length < 12) {
      return 'Medio';
    } else {
      return 'Fuerte';
    }
  }

  passwordStrengthPercentage(): number {
    const password = this.newPassword;
    if (password.length < 8) {
      return (password.length / 8) * 100;
    } else if (password.length < 12) {
      return (password.length / 12) * 100;
    } else {
      return 100;
    }
  }

  changePassword(): void {
    if (!this.newPassword) {
      console.error('La nueva contraseña está vacía.');
      Swal.fire('Error', 'La nueva contraseña está vacía', 'error'); // SweetAlert2 para mostrar error
      return;
    }

    this.signInUpService.changePassword(this.userId, this.newPassword).subscribe(
      response => {
        console.log('Cambio de contraseña exitoso:', response);
        Swal.fire('Éxito', '¡Cambio de contraseña exitoso! Se ha cerrado sesión.', 'success'); // SweetAlert2 para éxito
        this.router.navigate(['']);
      },
      error => {
        console.error('Error al cambiar la contraseña:', error);
        Swal.fire('Error', 'Fallo al cambiar contraseña, Intente nuevamente', 'error'); // SweetAlert2 para mostrar error
      }
    );
  }
  
  
}