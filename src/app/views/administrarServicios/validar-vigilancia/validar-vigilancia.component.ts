import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { InformeService } from "../../../services/informe/informe.service";
import { PuestosEXcentroService } from '../../../services/PuestosXcentro/puestos-excentro.service';
import { PuestosVXcentroService } from '../../../services/PuestosXcentro/puestos-vxcentro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SedesService } from '../../../services/sedes/sedes.service';
import { CentroFormacionService } from "../../../services/centro-formacion/centro-formacion.service";
import { CentificacionCentroService } from '../../../services/certificacionCentro/centificacion-centro.service';
import { DetalleContratoService } from "../../../services/detalleContrato/detalle-contrato.service";
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CentroFormacion } from 'app/models/centro-formacion/centro-formacion';
import { LoginService } from '../../../services/usuario/login.service';

import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Console } from 'console';

@Component({
  selector: 'app-validar-vigilancia',
  templateUrl: './validar-vigilancia.component.html',
  styleUrls: ['./validar-vigilancia.component.css'],
  providers: [DatePipe]
})
export class ValidarVigilanciaComponent implements OnInit {

  obligacionesXcentro: any[] = []
  centroId: string;
  puestoVxCentro: any[] = [];
  puestoExCentro: any[] = [];
  sedes: any[] = [];
  centroFormacion: CentroFormacion = { ordenador_gasto: '', regional: '' }; // Inicializa como objeto vacío
  fechaInicio: Date;
  fechaFin: Date;
  fechaActual: string;
  isGeneratingPDF: boolean = false;
  logoImage: string | ArrayBuffer | null = null;
  opcionesCumple: string[] = ["Sí", "No", "N/A"];
  obligacionesContratista: any[] = [];
  obligacionesContractuales: any[] = [];
  fechasSeleccionadas: boolean = false;
  idcertificacion_centrof: number | null = null;
  observaciones1: string = '';
  observaciones2: string = '';
  todosSeleccionados: boolean;
  userData: any; 
  firmaUsuarioFile: File | null = null;
  firmaUsuarioUrl: string | null = null;
  userId: string;
  
  constructor(
    private informeS: InformeService,
    private _puestosEXCentroService: PuestosEXcentroService,
    private _puestosVXCentroService: PuestosVXcentroService,
    private route: ActivatedRoute,
    private router: Router,
    private sedesService: SedesService,
    private centroFormacionService: CentroFormacionService,
    private certificacionCentroService: CentificacionCentroService,
    private detalleContratoService: DetalleContratoService,
    private datePipe: DatePipe,
    private signInUpService: LoginService,
  ) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId'); 
    console.log(this.userId)
    this.getUserData();
    this.route.params.subscribe(params => {
      
      this.centroId = params['idcentro_formacion'];
     
      this.obtenerPuestosVPorCentro(Number(this.centroId));
      this.obtenerPuestosVEPorCentro(Number(this.centroId));
      this.obtenerSedesPorCentroFormacion(String(this.centroId));
      this.obtenerCentroFormacion(String(this.centroId));
    });
    this.fechaActual = this.datePipe.transform(new Date(), 'dd \'de\' MMMM \'de\' yyyy');
  }

  validarTodosSeleccionados(): void {
    this.todosSeleccionados = true;
  
    this.obligacionesContratista.forEach(obligacion => {
      if (!obligacion.cumple) {
        this.todosSeleccionados = false;
      }
    });
  
    this.obligacionesContractuales.forEach(obligacion => {
      if (!obligacion.cumple2) {
        this.todosSeleccionados = false;
      }
    });
  }
  
  getUserData() {
    this.signInUpService.getUserById(this.userId).subscribe(
      (userData) => {
        this.userData = userData;
        console.log('UserData:', this.userData);

        if (this.userData.user.firma_usuario) {
          this.firmaUsuarioUrl = `http://localhost:3000/uploads/${this.userData.user.firma_usuario}`;
        }
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message 
        });
      }
    );
  }

  obtenerPuestosVPorCentro(centroId: number): void {
    this._puestosVXCentroService.obtenerPuestosVxCentro(centroId).subscribe(
      (response) => {
        this.puestoVxCentro = response.data;
        const idempresa = response.data[0].idempresa;
        console.log('vxcentro:', response.data);
        console.log('empresa:', idempresa);

        this.obtenerObligacionesPorEmpresa(idempresa);
      },
      (error) => {
      }
    );
  }

  obtenerPuestosVEPorCentro(centroId: number): void {
    this._puestosEXCentroService.obtenerPuestosExCentro(centroId).subscribe(
      (response) => {
        this.puestoExCentro = response.data;
        const idempresa = response.data[0].idempresa;
        console.log('vexcentro:', response.data);
        console.log('empresa:', idempresa);

        this.obtenerObligacionesPorEmpresa(idempresa);
      },
      (error) => {
      }
    );
  }

  obtenerObligacionesPorEmpresa(idempresa: number): void {
    this.informeS.obtenerObliXcentro(idempresa).subscribe(
      (obligacionesResponse) => {
        console.log('Respuesta de obtenerObliXcentro:', obligacionesResponse);
        this.obligacionesContratista = obligacionesResponse.filter(obligacion => obligacion.idobligaciones_contratista !== null);
        this.obligacionesContractuales = obligacionesResponse.filter(obligacion => obligacion.idobligaciones_contractuales !== null);
      },
      (error) => {
        console.error('Error al obtener las obligaciones:', error);
      }
    );
  }


  obtenerSedesPorCentroFormacion(centroId: string): void {
    this.sedesService.obtenerSedesPorCentroFormacion(centroId)
      .pipe(
        catchError(error => {
          console.error('Error al obtener sedes por centro de formación:', error);
          return of([]);
        })
      )
      .subscribe(sedes => {
        this.sedes = sedes;
        console.log('sedes:', sedes)
      });
  }

  getSedeCiudadDireccion(sedeId: number): string {
    const sede = this.sedes.find(s => s.id === sedeId); 
    return sede ? ` ${sede.dir_sede_formacion}` : 'N/A';
  }

  obtenerNombreEmpresa(): string {
    const empresa = this.puestoVxCentro.length > 0 ? this.puestoVxCentro[0].nombre_empresa :
      this.puestoExCentro.length > 0 ? this.puestoExCentro[0].nombre_empresa : 'N/A';
    return empresa;
  }

  obtenerNombreSede(): string {
    const sede = this.sedes.length > 0 ? this.sedes[0].sede_formacion : 'N/A';
    return sede;
  }

  obtenerCentroFormacion(centroId: string): void {
    this.centroFormacionService.getCentroFormacion(centroId).subscribe(
      (response) => {
        console.log('Centro de formación:', response.data);
        this.centroFormacion = response.data;
      },
      (error) => {
        console.error('Error al obtener el centro de formación:', error);
      }
    );
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.logoImage = e.target?.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  
  
    
    
    validarFechas(): void {
      if (this.fechaInicio && this.fechaFin) {
        const fechaInicioObj = new Date(this.fechaInicio);
        const fechaFinObj = new Date(this.fechaFin);
    
        if (fechaInicioObj > fechaFinObj) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'La fecha inicial no puede ser mayor que la fecha final.'
          });
          return;
        }
    
        const certificacionData = {
          idcentro_formacion: this.centroId,
          fecha_inicio: this.fechaInicio,
          fecha_fin: this.fechaFin
        };
    
        this.certificacionCentroService.crearCertificacionCentro(certificacionData).subscribe(
          (response) => {
            console.log('Respuesta de crear certificación:', response);
            this.idcertificacion_centrof = response.data.idcertificacion_centrof; // Asume que la estructura es correcta
            console.log('ID de certificación:', this.idcertificacion_centrof);
            this.fechasSeleccionadas = true;
    
          },
          (error) => {
            console.error('Error al guardar la certificación', error);
          }
        );
      }
    }
    
   
    
    
    guardarInforme(): void {
      if (this.idcertificacion_centrof) {
        let detallesContrato: any[] = [];
    
        this.obligacionesContratista.forEach((obligacion) => {
          this.puestoVxCentro.forEach((puestoVigilancia) => {
            detallesContrato.push({
              idcertificacion_centrof: this.idcertificacion_centrof,
              idobligaciones_contrato: obligacion.idobligaciones_contrato,
              cumple: obligacion.cumple,
              nombreDetalleContrato: `informe_${this.datePipe.transform(new Date(), 'yyyy-MM-dd')}`,
              firma_usuario:  this.userData.user.firma_usuario ,
              descripcionVHumana: puestoVigilancia.descripcionVHumana || '',
              cantidad_puestov: puestoVigilancia.cantidad_puestov || 0,
              direccionSedeVHumana: puestoVigilancia.direccionSedeVHumana || '',
              total: puestoVigilancia.total || 0,
              descripcion: '',
              cantidad: 0,
              direccionSedeVElectronica: '',
              totalE: 0,
              observaciones1: this.observaciones1 || '',
              observaciones2: '',
              fechaCreacion: this.fechaActual || ''
            });
          });
        });
    
        this.obligacionesContractuales.forEach((obligacion) => {
          this.puestoExCentro.forEach((puestoElectronico) => {
            detallesContrato.push({
              idcertificacion_centrof: this.idcertificacion_centrof,
              idobligaciones_contrato: obligacion.idobligaciones_contrato,
              cumple: obligacion.cumple2,
              nombreDetalleContrato: `informe_${this.datePipe.transform(new Date(), 'yyyy-MM-dd')}`,
              firma_usuario:  this.userData.user.firma_usuario ,
              descripcionVHumana: '',
              cantidad_puestov: 0,
              direccionSedeVHumana: '',
              total: 0,
              descripcion: puestoElectronico.descripcion || '',
              cantidad: puestoElectronico.cantidad || 0,
              direccionSedeVElectronica: puestoElectronico.direccionSedeVElectronica || '',
              totalE: puestoElectronico.totalE || 0,
              observaciones1: '',
              observaciones2: this.observaciones2 || '',
              fechaCreacion: this.fechaActual || ''
            });
          });
        });
    
        detallesContrato.forEach(detalle => {
          this.detalleContratoService.crearDetalleContrato(detalle).subscribe(
            (response) => {
              console.log('Respuesta de crear detalle contrato:', response);
            },
            (error) => {
              console.error('Error al crear detalle contrato:', error);
              Swal.fire({
                icon: 'error',
                title: 'Error al guardar',
                text: 'Ocurrió un error al guardar el informe. Por favor, intenta nuevamente más tarde.',
              });            }
          );
        });
        Swal.fire({
          icon: 'success',
          title: '¡Informe guardado!',
          text: 'El informe se ha guardado correctamente.',
        }).then(() => {
          this.router.navigate(['/ListaInformes']);
        })
      } else {
        console.error('Error: idcertificacion_centrof no está definido.');
      }
    }
    
    
    eliminarPuestoVigilancia(puesto: any): void {
      this.puestoVxCentro = this.puestoVxCentro.filter(item => item !== puesto);
    }
    
    eliminarPuestoElectronico(puesto: any): void {
      this.puestoExCentro = this.puestoExCentro.filter(item => item !== puesto);
    }
    eliminarObligacionContratista(index: number): void {
      this.obligacionesContratista.splice(index, 1); 
      this.validarTodosSeleccionados(); 
    }
    
    eliminarObligacionContractual(index: number): void {
      this.obligacionesContractuales.splice(index, 1); 
      this.validarTodosSeleccionados(); 
    }    
  }
  
