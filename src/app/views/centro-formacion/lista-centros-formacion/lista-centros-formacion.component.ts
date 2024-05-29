import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
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
  showModal: boolean = false;
  mostrarModalPuestos: boolean = false;
  mostrarModalSedes: boolean = false;
  centroSeleccionado: any = {};
  listaCentrosFormacion: CentroFormacion[] = [];
  centrosFiltrados: CentroFormacion[] = [];
  puestoVxCentro: any;
  puestoExCentro: any;
  isLoggedIn = false;
  userData: any;
  loginStatusSubscription!: Subscription;
  isSuperAdministrador = false;
  isOrdenadorG = false;
  currentRoute = '';
  pageSize: number = 10;
  currentPage: number = 1;
  terminoBusqueda: string = '';
  noResultados: boolean = false;

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
      this.listaCentrosFormacion = data.data;
      this.filtrarCentros(); // Inicializa los datos filtrados
    }, error => {
      console.error('Error al obtener la lista de centros de formación:', error);
    });
  }

  setPage(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  getPages(): number[] {
    const pageCount = Math.ceil(this.centrosFiltrados.length / this.pageSize);
    return Array(pageCount).fill(0).map((x, i) => i + 1);
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
    this.mostrarModalPuestos = true;
  }

  abrirModalVerSedes(item: any): void {
    this.centroSeleccionado = item;
    this.mostrarModalSedes = true;
  }

  handleCloseModal(): void {
    this.mostrarModalPuestos = false;
    this.mostrarModalSedes = false;
  }

  async checkAuthentication(): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      if (token && await this.tokenValidationService.isValidToken(token)) {
        this.isLoggedIn = true;
        this.userData = await this.tokenValidationService.getUserData(token);
        this.setUserRoles(this.userData.idperfil);
        this.cdr.detectChanges();
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
  }
}
