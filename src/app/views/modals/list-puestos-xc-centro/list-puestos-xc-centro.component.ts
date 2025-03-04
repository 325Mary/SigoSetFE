import { Component, ViewChild, ElementRef, Input, Output, EventEmitter, ChangeDetectorRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { PuestosEXcentroService } from '../../../services/PuestosXcentro/puestos-excentro.service';
import { PuestosVXcentroService } from '../../../services/PuestosXcentro/puestos-vxcentro.service';
import { EmpresaService } from '../../../services/empresas/empresa.service';
import { TokenValidationService } from '../../../services/VertificacionUser/token-validation.service';
import { LoginService } from "../../../services/usuario/login.service";
import { Subscription } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-puestos-xc-centro',
  templateUrl: './list-puestos-xc-centro.component.html',
  styleUrls: ['./list-puestos-xc-centro.component.css']
})
export class ListPuestosXcCentroComponent implements OnInit, OnChanges {
  @Input() centroSeleccionado: any;
  @Output() actualizarLista = new EventEmitter<void>();
  @Input() mostrarModal: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  puestoVxCentro: any[] = [];
  puestoExCentro: any[] = [];
  editingEnabled: boolean = false;
  empresas: any[];
  empresaSeleccionada: any;
  originalPuestoHumano: any = {};
  originalPuestoElectronico: any = {};
  isLoggedIn = false;
  userData: any;
  loginStatusSubscription!: Subscription;
  isSuperAdministrador = false;
  isOrdenadorG = false;
  currentRoute = '';

  constructor(
    private _puestosEXCentroService: PuestosEXcentroService,
    private _puestosVXCentroService: PuestosVXcentroService,
    private empresaService: EmpresaService,
    private tokenValidationService: TokenValidationService,
    private authService: LoginService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    this.router.events.subscribe((val) => {
      this.currentRoute = this.router.url;
    });
  }

  ngOnInit(): void {
    this.checkAuthentication();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.currentRoute = this.router.url;
        this.checkAuthentication();
      }
    });
    this.loginStatusSubscription = this.authService.loginStatusChanged.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.centroSeleccionado && changes.centroSeleccionado.currentValue) {
      const idcentro_formacion = changes.centroSeleccionado.currentValue.idcentro_formacion;
      console.log('ID de centro seleccionado:', idcentro_formacion);
      this.obtenerEmpresas(); // Llama a obtenerEmpresas primero
    }
  }
  
  obtenerEmpresas() {
    this.empresaService.obtenerEmpresas().subscribe(
      (response) => {
        this.empresas = response.data[0];
        console.log('empresas', this.empresas);
        this.actualizarPuestos(); // Después de obtener empresas, actualiza los puestos
      },
      (error) => {
        console.error('Error al obtener perfiles:', error);
      }
    );
  }

  actualizarPuestos() {
    if (this.centroSeleccionado) {
      const idcentro_formacion = this.centroSeleccionado.idcentro_formacion;
      this.obtenerPuestosVPorCentro(idcentro_formacion);
      this.obtenerPuestosVEPorCentro(idcentro_formacion);
    }
  }

  onEmpresaSelected(event: any, puesto: any): void {
    const selectedCompanyName = event.target.value;
    const selectedCompany = this.empresas.find(empresa => empresa.nombre_empresa === selectedCompanyName);
    if (selectedCompany) {
      puesto.idempresa = selectedCompany.idempresa;
      console.log('Id de la empresa seleccionada:', puesto.idempresa);
    }
  }

  obtenerPuestosVPorCentro(idcentro_formacion: number): void {
    this._puestosVXCentroService.obtenerPuestosVxCentro(idcentro_formacion).subscribe(
      (response) => {
        this.cdr.detectChanges();
        this.puestoVxCentro = response.data;
        console.log(response.data);
      },
      (error) => {
        console.error('Error obteniendo puestos VxCentro:', error);
      }
    );
  }

  obtenerPuestosVEPorCentro(idcentro_formacion: number): void {
    this._puestosEXCentroService.obtenerPuestosExCentro(idcentro_formacion).subscribe(
      (response) => {
        this.cdr.detectChanges();
        this.puestoExCentro = response.data;
        console.log(response.data);
      },
      (error) => {
        console.error('Error obteniendo puestos ExCentro:', error);
      }
    );
  }

  close(): void {
    this.closeModal.emit();
    this.puestoVxCentro = [];
    this.puestoExCentro = [];
  }
  

  editarPuestoHumano(puesto: any): void {
    puesto.editando = true;
    // Guardar una copia de los datos originales
    this.originalPuestoHumano[puesto.idpuestosvxcentrof] = { ...puesto };
  }

  guardarCambiosHumano(puesto: any): void {
    // Comparar los datos originales con los actuales
    const original = this.originalPuestoHumano[puesto.idpuestosvxcentrof];
    if (original.cantidad_puestov === puesto.cantidad_puestov && original.idempresa === puesto.idempresa  && original.status === puesto.status) {
      Swal.fire('Aviso', 'No se ha realizado ningún cambio', 'info');
    } else {
      const nuevoPuestoData = {
        idempresa: puesto.idempresa,
        cantidad_puestov: puesto.cantidad_puestov,
        status: puesto.status
      };

      this._puestosVXCentroService.editarPuestoVxCentro(puesto.idpuestosvxcentrof, nuevoPuestoData).subscribe(
        (response) => {
          Swal.fire('¡Éxito!', 'Cambios guardados correctamente', 'success');
          this.actualizarListaPuestos();
        },
        (error) => {
          Swal.fire('Error', 'Error al guardar los cambios', 'error');
          console.error('Error al guardar los cambios:', error);
        }
      );
    }

    puesto.editando = false;
  }

  editarPuestoElectronico(puesto: any): void {
    puesto.editando = true;
    // Guardar una copia de los datos originales
    this.originalPuestoElectronico[puesto.idpuntosvelectronica] = { ...puesto };
  }

  guardarCambiosElectronico(puesto: any): void {
    const original = this.originalPuestoElectronico[puesto.idpuntosvelectronica];
    if (original.cantidad === puesto.cantidad && original.idempresa === puesto.idempresa && original.statusE === puesto.statusE) {
      Swal.fire('Aviso', 'No se ha realizado ningún cambio', 'info');
    } else {
      const nuevoPuestoData = {
        idempresa: puesto.idempresa,
        cantidad: puesto.cantidad,
        statusE: puesto.statusE
      };
  
      console.log(nuevoPuestoData);
  
      this._puestosEXCentroService.editarPuestoVExCentro(puesto.idpuntosvelectronica, nuevoPuestoData).subscribe(
        (response) => {
          Swal.fire('¡Éxito!', 'Cambios guardados correctamente', 'success');
          this.actualizarListaPuestos();
        },
        (error) => {
          Swal.fire('Error', 'Error al guardar los cambios', 'error');
          console.error('Error al guardar los cambios:', error);
        }
      );
    }
  
    puesto.editando = false;
  }
  

  actualizarListaPuestos(): void {
    if (this.centroSeleccionado) {
      const idcentro_formacion = this.centroSeleccionado.idcentro_formacion;
      this.obtenerPuestosVPorCentro(idcentro_formacion);
      this.obtenerPuestosVEPorCentro(idcentro_formacion);
    }
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

  eliminarPuestoHumano(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._puestosVXCentroService.eliminarPuestoVxCentro(id).subscribe(
          () => {
            this.puestoVxCentro = this.puestoVxCentro.filter(puesto => puesto.idpuestosvxcentrof !== id);
            Swal.fire('Eliminado', 'El puesto ha sido eliminado.', 'success');
          },
          (error) => {
            console.error('Error eliminando puesto humano:', error);
            Swal.fire('Error', 'Hubo un error al eliminar el puesto.', 'error');
          }
        );
      }
    });
  }

  eliminarPuestoElectronico(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._puestosEXCentroService.eliminarPuestoVExCentro(id).subscribe(
          () => {
            this.puestoExCentro = this.puestoExCentro.filter(puesto => puesto.idpuntosvelectronica !== id);
            Swal.fire('Eliminado', 'El puesto ha sido eliminado.', 'success');
          },
          (error) => {
            console.error('Error eliminando puesto electrónico:', error);
            Swal.fire('Error', 'Hubo un error al eliminar el puesto.', 'error');
          }
        );
      }
    });
  }
}
