import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/usuario/login.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userId: string = '';
  userData: any; // Aquí puedes definir una interfaz o clase para el tipo de datos del usuario

  constructor(
    private signInUpService: LoginService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Obtener el ID del usuario desde la ruta activada
    this.route.params.subscribe(params => {
      console.log('UserID recibido:', params['userId']);
      this.userId = params['userId']; // Asignar el userId obtenido de los parámetros de la ruta
      this.getUserData(); // Llamar a getUserData() para obtener los datos del usuario
    });
  }

  getUserData() {
    this.signInUpService.getUserById(this.userId).subscribe(
      (userData) => {
        this.userData = userData;
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
        // Mostrar mensaje de error con SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message // Mostrar el mensaje de error del backend
        });
      }
    );
  }

  // Función para editar datos de usuario
  editUser(userId: string, newData: any) {
    this.signInUpService.editUser(userId, newData).subscribe(
      response => {
        console.log('Datos de usuario actualizados:', response);
        // Mostrar mensaje de éxito con SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Datos de usuario actualizados correctamente'
        });
        // Manejar la respuesta aquí
      },
      error => {
        console.error('Error al editar datos de usuario:', error);
        // Mostrar mensaje de error con SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message // Mostrar el mensaje de error del backend
        });
      }
    );
  }

  submitForm() {
    const { perfil, ...filteredData } = this.userData.user;

    // Llamar a la función para editar los datos del usuario
    this.editUser(this.userId, filteredData);  }
}
