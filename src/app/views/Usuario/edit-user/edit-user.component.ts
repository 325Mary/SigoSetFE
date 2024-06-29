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
  firmaUsuarioFile: File | null = null;
  firmaUsuarioUrl: string | null = null;
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
        console.log('UserData:', this.userData);

        // Construir la URL completa para la firma del usuario
        if (this.userData.user.firma_usuario) {
          this.firmaUsuarioUrl = `http://localhost:3000/uploads/${this.userData.user.firma_usuario}`;
        }
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

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.userData.firma_usuario = file;
    }
  }
  
  editUser(userId: string, newData: any) {
    const formData = new FormData();
    formData.append('email_usuario', newData.email_usuario);
    formData.append('nombre_usuario', newData.nombre_usuario);
    formData.append('apellido_usuario', newData.apellido_usuario);
    formData.append('telefono_usuario', newData.telefono_usuario);
    formData.append('firma_usuario', newData.firma_usuario); 
  
    this.signInUpService.editUser(userId, formData).subscribe(
      response => {
        console.log('Datos de usuario actualizados:', response);
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Datos de usuario actualizados correctamente'
        });
      },
      error => {
        console.error('Error al editar datos de usuario:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message 
        });
      }
    );
  }
  
  submitForm() {
    const { perfil, ...filteredData } = this.userData.user;
    filteredData.firma_usuario = this.userData.firma_usuario; // Agregar la firma al objeto de datos
  
    // Llamar a la función para editar los datos del usuario
    this.editUser(this.userId, filteredData);
  }
  
}
