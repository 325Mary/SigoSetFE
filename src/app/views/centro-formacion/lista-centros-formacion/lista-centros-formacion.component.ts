import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { CentroFormacionService } from '../../../services/centro-formacion/centro-formacion.service';
import { CentroFormacion } from '../../../models/centro-formacion/centro-formacion';
import { PuestosEXcentroService } from '../../../services/PuestosXcentro/puestos-excentro.service';
import { PuestosVXcentroService } from '../../../services/PuestosXcentro/puestos-vxcentro.service';
import { TokenValidationService } from '../../../services/VertificacionUser/token-validation.service';
import { LoginService } from '../../../services/usuario/login.service';
import { Subscription } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';
import Swal from 'sweetalert2';
import { Console } from 'console';


@Component({
  selector: 'app-lista-centros-formacion',
  templateUrl: './lista-centros-formacion.component.html',
  styleUrls: ['./lista-centros-formacion.component.css']
})
export class ListaCentrosFormacionComponent implements OnInit, OnDestroy {
  @ViewChild('modalContent') modalContent: ElementRef<any> | null = null;
  showModal: boolean = false;
  mostrarModalPuestos: boolean = false; 
  mostrarModalSedes: boolean = false;
  mostrarModalAsignarSedes: boolean = false;
  centroSeleccionado: any = {};
  listaCentrosFormacion: CentroFormacion[] = [];
  puestoVxCentro: any;
  puestoExCentro: any;
  isLoggedIn = false;
  userData: any;
  loginStatusSubscription!: Subscription;
  isSuperAdministrador = false;
  isOrdenadorG = false;
  currentRoute = '';
  mostrarModalSolicitarPuestos: boolean = false; 

  constructor(
    private _centroFormacionService: CentroFormacionService,  
    private _puestosEXCentroService: PuestosEXcentroService,
    private _puestosVXCentroService: PuestosVXcentroService,
    private tokenValidationService: TokenValidationService,
    private authService: LoginService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.router.events.subscribe((val) => {
      this.currentRoute = this.router.url;
    });
  }

  pageSize: number = 10; // Número de usuarios por página
  currentPage: number = 1; // Página actual

  ngOnInit(): void {
    this.getListaCentrosFormacion();
    this.checkAuthentication();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.currentRoute = this.router.url;
        this.closeModal();
        this.checkAuthentication();
      }
    });

    this.loginStatusSubscription = this.authService.loginStatusChanged.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  ngOnDestroy(): void {
    this.loginStatusSubscription.unsubscribe();
  }

  getListaCentrosFormacion() {
    this._centroFormacionService.getCentrosFormacion().subscribe(data => {
      if (Array.isArray(data.data)) {
        this.listaCentrosFormacion = data.data;
      } else {
        this.listaCentrosFormacion = [data.data];
      }
      console.log(this.listaCentrosFormacion);
      console.log(data.message);
      this.cdr.detectChanges(); // Ensure change detection is triggered
    }, error => {
      console.error('Error fetching centros de formacion:', error);
    });
  }
  

  // Función para cambiar de página
  setPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  // Función para obtener los números de página disponibles
  getPages(): number[] {
    const pageCount = Math.ceil(this.listaCentrosFormacion.length / this.pageSize);
    return Array(pageCount).fill(0).map((x, i) => i + 1);
  }

  eliminarCentroFormacion(id: any) {
    Swal.fire({
      title: 'Eliminar Centro de formación',
      text: 'Estas seguro que quieres eliminar este centro de formacion?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((results) => {
      if (results.isConfirmed) {
        this._centroFormacionService.eliminarCentroFormacion(id).subscribe(data => {
          console.log(data);
          if (data.status === 'success') {
            this.getListaCentrosFormacion();
            Swal.fire(
              'Centro de formación Eliminado!',
              'El centro de formacion fue eliminado con exito',
              'success'
            );
          } else {
            Swal.fire({
              title: 'Error',
              text: 'Error al eliminar el centro de formacion',
              icon: 'error',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Aceptar'
            });
          }
        }, error => {
          console.error('Error eliminando centro de formacion:', error);
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al eliminar el centro de formación.',
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
          });
        });
      }
    });
  }

  closeModal(): void {
    this.showModal = false;
    this.mostrarModalPuestos = false;
  }

  abrirModalVerPuestos(item: any): void {
    console.log('Item seleccionado:', item);
    this.centroSeleccionado = item;
    this.mostrarModalPuestos = true;
    console.log('Centro seleccionado asignado en el padre:', this.centroSeleccionado);
  }

  abrirModalVerSedes(item: any): void {
    this.centroSeleccionado = item;
    this.mostrarModalSedes = true;
  }
  abrirModalSolicitarPuestos(item: any): void {
    this.centroSeleccionado = item;
    this.mostrarModalSolicitarPuestos = true;
  }
  abrirModalAsignarSede(item: any): void {
    this.centroSeleccionado = item;
    this.mostrarModalAsignarSedes= true
  }
  handleCloseModal(): void {
    this.mostrarModalPuestos = false;
    this.mostrarModalSedes = false;
    this.mostrarModalAsignarSedes =false
    this.mostrarModalSolicitarPuestos = false
  }

  actualizarLista(): void {
    this.getListaCentrosFormacion();
  }

  async checkAuthentication() {
    try {
      const token = localStorage.getItem('token');
      if (token && await this.tokenValidationService.isValidToken(token)) {
        this.isLoggedIn = true;
        this.userData = await this.tokenValidationService.getUserData(token);
        this.setUserRoles(this.userData.idperfil);
        // console.log('isLogin:', this.userData);
        this.cdr.detectChanges(); // Ensure change detection is triggered
      }
    } catch (error) {
      console.error('Error al verificar la autenticación:', error);
    }
  }

  setUserRoles(idperfil: number) {
    if (idperfil) {
      this.isSuperAdministrador = idperfil === 1;
      this.isOrdenadorG = idperfil === 2;
    }
  }

  abrirAsignarOrdenadorGasto(item: any): void {
    this.authService.listarUsuarios().subscribe((response) => {
      console.log('Respuesta completa de listarUsuarios:', response);
      if (!Array.isArray(response.data)) {
        console.error('La respuesta no contiene un array válido en data:', response.data);
        return;
      }
  
      const usuarios = response.data.flat();
      console.log('Usuarios aplanados:', usuarios);
  
      // Filtrar usuarios por idcentro_formacion
      const usuariosFiltradosPorCentro = usuarios.filter((usuario: any) => {
        return Number(usuario.idcentro_formacion) === Number(item.idcentro_formacion);
      });
  
      // Filtrar usuarios por perfil igual a 2
      const usuariosFiltrados = usuariosFiltradosPorCentro.filter((usuario: any) => {
        return Number(usuario.idperfil) === 2;
      });
  
      console.log('Usuarios filtrados:', usuariosFiltrados);
  
      const selectOptions = {};
      usuariosFiltrados.forEach((usuario: any) => {
        selectOptions[usuario.idUsuario] = usuario.nombre_usuario; // Aquí usamos usuario.idUsuario
      });
      console.log('Opciones del select:', selectOptions);
  
      if (Object.keys(selectOptions).length === 0) {
        Swal.fire(
          'No hay usuarios disponibles',
          'No se encontraron usuarios con el perfil "Ordenador del gasto" para este centro de formación.',
          'warning'
        );
        return;
      }
  
      Swal.fire({
        title: 'Asignar Ordenador de Gasto',
        input: 'select',
        inputOptions: selectOptions,
        inputPlaceholder: 'Selecciona un usuario',
        showCancelButton: true,
        confirmButtonText: 'Asignar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        console.log('Resultado del cuadro de diálogo de Swal:', result);
        if (result.isConfirmed) {
          console.log('Then de Swal.fire alcanzado');
          const selectedUserId = Number(result.value); // Convertir a número
          console.log('ID de usuario seleccionado:', selectedUserId);
          const selectedUser = usuariosFiltrados.find((usuario: any) => Number(usuario.idUsuario) === selectedUserId); // Aquí usamos find en lugar de filter
          console.log('Usuario seleccionado:', selectedUser);
          if (selectedUser) {
            // Llama a la función asignarOrdenadorGasto aquí
            this.asignarOrdenadorGasto(item, selectedUser);
          }
        }
      });
  
    });
  }
  
  
  
  
  asignarOrdenadorGasto(item: any, usuario: any): void {
    const updatedCentroFormacion = {
      ...item,
      ordenador_gasto: usuario.nombre_usuario,
      telefono_ordenadorg: usuario.telefono_usuario,
      email_ordenadorg: usuario.email_usuario
    };
  
    this._centroFormacionService.editarCentroFormacion(item.idcentro_formacion, updatedCentroFormacion)
      .subscribe(response => {
        console.log('Centro de formación actualizado:', response);
        if (response.status === 'success') {
          Swal.fire(
            'Asignación Completa',
            'El ordenador de gasto ha sido asignado correctamente.',
            'success'
          );
          this.getListaCentrosFormacion(); // Actualizar la lista de centros
        } else {
          Swal.fire(
            'Error',
            'Hubo un problema al asignar el ordenador de gasto.',
            'error'
          );
        }
      }, error => {
        console.error('Error al actualizar el centro de formación:', error);
        Swal.fire(
          'Error',
          'Ocurrió un error al asignar el ordenador de gasto. Por favor, intenta nuevamente.',
          'error'
        );
      });
  }
  
  
  
  
}
