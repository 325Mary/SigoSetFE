import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/usuario/login.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  usuarios: any[];
  pageSize: number = 10; // Número de usuarios por página
  currentPage: number = 1; // Página actual
  
 
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.listarUsuarios().subscribe(
      response => {
        if (response.data && response.data.length > 0) {
          this.usuarios = response.data[0];
          console.log('Primer array de usuarios:', this.usuarios);
        } else {
          console.error('La respuesta no contiene datos o el primer array está vacío.');
        }
      },
      error => {
        console.error('Error al obtener la lista de usuarios:', error);
      }
    );
  }

    // Función para cambiar de página
  setPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  // Función para obtener los números de página disponibles
  getPages(): number[] {
    const pageCount = Math.ceil(this.usuarios.length / this.pageSize);
    return Array(pageCount).fill(0).map((x, i) => i + 1);
  }

// Función para enviar el correo electrónico al usuario con el ID especificado
enviarCorreo(idUsuario: string) {
  this.loginService.enviarCorreo(idUsuario).subscribe(
    response => {
      // console.log('Correo enviado al usuario:', response);
      Swal.fire({
        icon: 'success',
        title: 'Correo enviado',
        text: 'El correo se ha enviado correctamente.'
      });
    },
    error => {
      // console.error('Error al enviar el correo electrónico:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al enviar correo',
        text: 'Hubo un problema al enviar el correo. Por favor, inténtalo de nuevo más tarde.'
      });
      console.error('Error al enviar correo:', error);
    }
  );
    
  
}

cambiarEstado(idUsuario: string) {
  this.loginService.cambiarEstadoUsuario(idUsuario, 'nuevoEstado').subscribe(
    response => {
      Swal.fire({
        icon: 'success',
        title: 'Estado cambiado',
        text: 'El estado del usuario ha sido cambiado correctamente.'
      });
    },
    error => {
      Swal.fire({
        icon: 'error',
        title: 'Error al cambiar estado',
        text: 'Hubo un problema al cambiar el estado del usuario. Por favor, inténtalo de nuevo más tarde.'
      });
      console.error('Error al cambiar estado:', error);
    }
  );
}

eliminarUsuario(idUsuario: string) {
  this.loginService.eliminarUsuario(idUsuario).subscribe(
    response => {
      Swal.fire({
        icon: 'success',
        title: 'Usuario eliminado',
        text: 'El usuario se ha eliminado correctamente.'
      });
      // Recargar la lista de usuarios después de eliminar uno
      this.refreshUserList();
    },
    error => {
      Swal.fire({
        icon: 'error',
        title: 'Error al eliminar usuario',
        text: 'Hubo un problema al eliminar el usuario. Por favor, inténtalo de nuevo más tarde.'
      });
      console.error('Error al eliminar usuario:', error);
    }
  );
}

private refreshUserList() {
  // Vuelve a cargar la lista de usuarios después de eliminar uno
  this.loginService.listarUsuarios().subscribe(
    response => {
      if (response.data && response.data.length > 0) {
        this.usuarios = response.data[0];
        console.log('Lista de usuarios actualizada:', this.usuarios);
      } else {
        console.error('La respuesta no contiene datos o el primer array está vacío.');
      }
    },
    error => {
      console.error('Error al obtener la lista de usuarios:', error);
    }
  );
}

}
