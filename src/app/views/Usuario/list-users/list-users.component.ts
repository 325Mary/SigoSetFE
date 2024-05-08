import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoginService } from '../../../services/usuario/login.service';
import { PerfilService } from '../../../services/usuario/perfil.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  @ViewChild('modalContent') modalContent: ElementRef<any> | null = null;

  showModal: boolean = false;

  usuarios: any[];
  pageSize: number = 10; // Número de usuarios por página
  currentPage: number = 1; // Página actual
  usuarioSeleccionado: any []
  perfiles: any[] = [];

  constructor(private loginService: LoginService,  private perfilService: PerfilService) { }

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
    this.obtenerPerfiles()
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
  Swal.fire({
    title: 'Selecciona un estado',
    icon: 'question',
    input: 'select',
    inputOptions: {
      'activo': 'Activo',
      'inactivo': 'Inactivo'
    },
    inputPlaceholder: 'Selecciona un estado',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    inputValidator: (value) => {
      if (!value) {
        return 'Debes seleccionar un estado';
      }
    }
  }).then((result) => {
    if (result.isConfirmed) {
      let estado: string;
      if (result.value === 'activo') {
        estado = 'Y';
      } else {
        estado = 'N';
      }
      this.enviarSolicitudCambioEstado(idUsuario, estado);
    }
  });
}

enviarSolicitudCambioEstado(idUsuario: string, estado: string) {
  this.loginService.cambiarEstadoUsuario(idUsuario, estado).subscribe(
    response => {
      Swal.fire({
        icon: 'success',
        title: 'Estado cambiado',
        text: 'El estado del usuario ha sido cambiado correctamente.'
      });
      this.refreshUserList();

      // Puedes realizar acciones adicionales aquí, como actualizar la vista
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
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Una vez eliminado, no podrás recuperar este usuario.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminarlo'
  }).then((result) => {
    if (result.isConfirmed) {
      this.enviarSolicitudEliminacion(idUsuario);
    }
  });
}

enviarSolicitudEliminacion(idUsuario: string) {
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

abrirModalVerUsuario(usuario: any): void {
  this.usuarioSeleccionado = usuario;
  this.showModal = true;
  console.log('Modal abierto');
}


handleCloseModal(): void {
  this.showModal = false;
  console.log('Modal cerrado');
}

closeModal(): void {
  this.showModal = false;
}

abrirCambiarPerfil(usuario: any) {
  // Crear las opciones de perfiles para el Sweet Alert
  const options = {};
  this.perfiles.forEach(perfil => {
    options[perfil.idperfil] = perfil.perfil;
  });

  Swal.fire({
    title: 'Selecciona un perfil',
    input: 'select',
    inputOptions: options,
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    inputValidator: (value) => {
      if (!value) {
        return 'Debes seleccionar un perfil';
      }
    }
  }).then((result) => {
    if (result.isConfirmed) {
      this.cambiarPerfilUsuario(usuario.idUsuario, result.value);
    }
  });
}

cambiarPerfilUsuario(idUsuario: string, idPerfil: string) {
  this.loginService.editUser(idUsuario, { idperfil: idPerfil }).subscribe(
    response => {
      Swal.fire({
        icon: 'success',
        title: 'Perfil cambiado',
        text: 'El perfil del usuario ha sido cambiado correctamente.'
      });
      this.refreshUserList();
    },
    error => {
      Swal.fire({
        icon: 'error',
        title: 'Error al cambiar perfil',
        text: 'Hubo un problema al cambiar el perfil del usuario. Por favor, inténtalo de nuevo más tarde.'
      });
      console.error('Error al cambiar perfil:', error);
    }
  );
}



}
