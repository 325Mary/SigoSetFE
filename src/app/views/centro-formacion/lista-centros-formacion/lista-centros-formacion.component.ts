import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { CentroFormacionService } from '../../../services/centro-formacion/centro-formacion.service';
import { CentroFormacion } from '../../../models/centro-formacion/centro-formacion';
import { PuestosEXcentroService } from '../../../services/PuestosXcentro/puestos-excentro.service';
import { PuestosVXcentroService } from '../../../services/PuestosXcentro/puestos-vxcentro.service';
import { TokenValidationService } from '../../../services/VertificacionUser/token-validation.service';
import { LoginService } from "../../../services/usuario/login.service";
import { Subscription } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-centros-formacion',
  templateUrl: './lista-centros-formacion.component.html',
  styleUrls: ['./lista-centros-formacion.component.css']
})
export class ListaCentrosFormacionComponent implements OnInit {
  @ViewChild('modalContent') modalContent: ElementRef<any> | null = null;
  @Output() centroSeleccionadoChange = new EventEmitter<any>();
  showModal: boolean = false;
  mostrarModalPuestos: boolean = false;
  mostrarModalSedes: boolean = false;
  mostrarModalAsignarSedes: boolean = false;
  centroSeleccionado: any = {};
  listaCentrosFormacion: any[] = []; //Cambie centrosdeformacion por any
  centrosFiltrados: CentroFormacion[] = [];
  puestoVxCentro: any;
  puestoExCentro: any;
  isLoggedIn = false;
  userData: any;
  loginStatusSubscription!: Subscription;
  isSuperAdministrador = false;
  isOrdenadorG = false;
  currentRoute = '';
  mostrarModalSolicitarPuestos: boolean = false; 
  terminoBusqueda: string = '';
  pageSize: number=10
  currentPage: number = 1;
  noResultados: boolean = false;
  mostrarModalAdminSolicitarPuestos: boolean = false; 

  
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

  getListaCentrosFormacion(): void {
    this._centroFormacionService.getCentrosFormacion().subscribe(data => {
      console.log(data); // Añadir este log para verificar los datos
      if (Array.isArray(data.data)) {
        this.listaCentrosFormacion = data.data;
      } else {
        this.listaCentrosFormacion = [data.data];
      }
      this.filtrarCentros(); // Inicializa los datos filtrados
    }, error => {
      console.error('Error al obtener la lista de centros de formación:', error);
    });
  }
  
  

  // Función para cambiar de página
  setPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }


  eliminarCentroFormacion(id: any): void {
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
          if (data.status === 'success') {
            this.getListaCentrosFormacion();
            Swal.fire('Centro de formación Eliminado!', 'El centro de formacion fue eliminado con exito', 'success');
          } else {
            Swal.fire('Error', 'Error al eliminar el centro de formacion', 'error');
          }
        });
      }
    });
  }

  closeModal(): void {
    this.showModal = false;
    this.mostrarModalPuestos = false;
  }

  abrirModalVerPuestos(item: any): void {
    this.centroSeleccionado = item;
    this.centroSeleccionadoChange.emit(item);
    this.mostrarModalPuestos = true;
  }

  abrirModalVerSedes(item: any): void {
    this.centroSeleccionado = item;
    this.mostrarModalSedes = true;
  }
  abrirModalSolicitarPuestos(item: any): void {
    this.centroSeleccionado = item;
    this.mostrarModalSolicitarPuestos = true;
  }
  abrirModalAdminPuestos(item: any): void {
    this.centroSeleccionado= item;
    this.mostrarModalAdminSolicitarPuestos = true
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
    this.mostrarModalAdminSolicitarPuestos = false
  }
  
  actualizarLista(): void {
    this.getListaCentrosFormacion();
  }

  async checkAuthentication(): Promise<void> {
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

  setUserRoles(idperfil: number): void {
    if (idperfil) {
      this.isSuperAdministrador = idperfil === 1;
      this.isOrdenadorG = idperfil === 2;
    }
  }

  filtrarCentros(): void {
    if (this.terminoBusqueda.trim() !== '') {
      this.centrosFiltrados = this.listaCentrosFormacion.filter((centro) => {
        return (
          centro.centro_formacion.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
        );
      });
    } else {
      this.centrosFiltrados = [...this.listaCentrosFormacion];
    }
    this.noResultados = this.centrosFiltrados.length === 0;
    this.currentPage = 1;
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
  
      if (usuariosFiltrados.length === 0) {
        Swal.fire(
          'No hay usuarios disponibles',
          'No se encontraron usuarios con el perfil "Ordenador del gasto" para este centro de formación.',
          'warning'
        );
        return;
      }
  
      // Crear opciones para el datalist
      let optionsHtml = '';
      usuariosFiltrados.forEach((usuario: any) => {
        optionsHtml += `<option value="${usuario.nombre_usuario}" data-id="${usuario.idUsuario}">${usuario.nombre_usuario}</option>`;
      });
  
      Swal.fire({
        title: 'Asignar Ordenador de Gasto',
        html: `
          <input list="usuarios" id="usuarioInput" class="swal2-input" placeholder="Selecciona un usuario">
          <datalist id="usuarios">
            ${optionsHtml}
          </datalist>
        `,
        preConfirm: () => {
          const usuarioInput = (document.getElementById('usuarioInput') as HTMLInputElement).value;
          const usuarioOption = Array.from(document.querySelectorAll('#usuarios option')).find(
            option => option.getAttribute('value') === usuarioInput
          );
          const userId = usuarioOption ? usuarioOption.getAttribute('data-id') : null;
          return userId;
        },
        showCancelButton: true,
        confirmButtonText: 'Asignar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        console.log('Resultado del cuadro de diálogo de Swal:', result);
        if (result.isConfirmed && result.value) {
          const selectedUserId = Number(result.value);
          console.log('ID de usuario seleccionado:', selectedUserId);
          const selectedUser = usuariosFiltrados.find((usuario: any) => Number(usuario.idUsuario) === selectedUserId);
          console.log('Usuario seleccionado:', selectedUser);
          if (selectedUser) {
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

  
  pageChange(event: number): void {
    this.currentPage = event;
  }
  
  
}
