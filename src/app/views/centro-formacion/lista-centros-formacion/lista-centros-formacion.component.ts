import { Component, OnInit, AfterViewInit,ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import {CentroFormacionService} from '../../../services/centro-formacion/centro-formacion.service'
import {CentroFormacion} from '../../../models/centro-formacion/centro-formacion'
import { PuestosEXcentroService } from '../../../services/PuestosXcentro/puestos-excentro.service';
import {PuestosVXcentroService} from '../../../services/PuestosXcentro/puestos-vxcentro.service'
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
  mostrarModalSedes: boolean= false
centroSeleccionado: any = {}
  listaCentrosFormacion: CentroFormacion[] = []
  puestoVxCentro: any;
  puestoExCentro: any;
  isLoggedIn = false;
  userData: any;
  loginStatusSubscription!: Subscription;
  isSuperAdministrador = false;
  isOrdenadorG = false;
  currentRoute = '';

  constructor(private _centroFormacionService: CentroFormacionService,  private _puestosEXCentroService: PuestosEXcentroService,
    private _puestosVXCentroService: PuestosVXcentroService,
    private tokenValidationService: TokenValidationService,
    private authService: LoginService,
    private router: Router,
    private cdr: ChangeDetectorRef,) {
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
   
  getListaCentrosFormacion() {
  this._centroFormacionService.getCentrosFormacion().subscribe(data => {
    this.listaCentrosFormacion= data.data;
    console.log(this.listaCentrosFormacion)
    console.log( data.message)
  }, error => {
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
        console.log(data )
        if (data.status == 'success') {
          this.getListaCentrosFormacion()
          Swal.fire(
            'Centro de formación Eliminado!',
            'El centro de formacion fue eliminado con exito',
            'success'
          )
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Error al eliminar el centro de formacion',
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
          }
          )
        }

      })

    }
  })

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

handleCloseModal(): void {
  this.mostrarModalPuestos = false;
  this.mostrarModalSedes=false
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
      console.log('isLogin:', this.userData)
      this.cdr.detectChanges(); // Realizar detección de cambios
    }
  } catch (error) {
    console.error('Error al verificar la autenticación:', error);
  }
}
setUserRoles(idperfil: Number) {
  if (idperfil) {
    this.isSuperAdministrador = idperfil === 1;
    this.isOrdenadorG = idperfil === 2;
  }
}


}



