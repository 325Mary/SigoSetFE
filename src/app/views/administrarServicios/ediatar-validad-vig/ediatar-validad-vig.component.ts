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
import Swal from 'sweetalert2';
import { Console } from 'console'

@Component({
  selector: 'app-ediatar-validad-vig',
  templateUrl: './ediatar-validad-vig.component.html',
  styleUrls: ['./ediatar-validad-vig.component.css']
})
export class EdiatarValidadVigComponent {
  nombreDetalleContrato: string;
  detalleContratoId: string;
  obligacionesXcentro: any[] = []
  puestoVxCentro: any[] = [];
  puestoExCentro: any[] = [];
  sedes: any[] = [];
  centroFormacion: CentroFormacion = { ordenador_gasto: '', regional: '' }; // Inicializa como objeto vacío
  // detallesL= { ordenador_gasto_centro: '', regional: '' }; // Inicializa como objeto vacío
  fechaInicio: Date;
  fechaFin: Date;
  fechaActual: string;
  isGeneratingPDF: boolean = false;
  logoImage: string | ArrayBuffer | null = null;
  opcionesCumple: string[] = ["Sí", "No", "N/A"];
  obligacionesContratista: any[] = [];
  puestosVh: any[]= [];
  puestosVE: any[]= [];
  obligacionesContractuales: any[] = [];
  fechasSeleccionadas: boolean = false;
  idcertificacion_centrof: number | null = null;
  idcentro_formacion: number
  detalles: any[] = [];
  detallesOriginales: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private detalleContratoService: DetalleContratoService,
    private _puestosEXCentroService: PuestosEXcentroService,
    private _puestosVXCentroService: PuestosVXcentroService,
    private centroFormacionService: CentroFormacionService,

  ) {
    
   }

   ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.detalleContratoId = params['iddetalle_contrato'];
      this.nombreDetalleContrato = params['nombreDetalleContrato'];
  
      // Llamar al servicio para obtener detalles por nombre
      this.detalleContratoService.obtenerDetallesContratosPorNombre(this.nombreDetalleContrato)
        .subscribe(response => {
          // Aquí maneja la respuesta del servicio
          this.detalles = response.data;
          console.log('Detalles del contrato por nombre:', this.detalles);
          
          // Asignar los datos obtenidos
          if (response.data && response.data.length > 0) {
            this.idcentro_formacion = response.data[0].idcentro_formacion;
            
           
            // this.obtenerCentroFormacion(String(this.idcentro_formacion));
            this.filtrarObligaciones()
            this.filtrarPuestos()
          }
        }, error => {
          console.error('Error al obtener detalles del contrato por nombre:', error);
          // Manejar errores según tu aplicación
        });
    });
    this.obtenerNombreSede();
    this.fechaActual = new Date().toLocaleDateString();
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
  obtenerNombreSede(): string {
    // Suponiendo que la información de la sede está disponible en el arreglo de sedes
    const sede = this.sedes.length > 0 ? this.sedes[0].sede_formacion : 'N/A';
    // console.log(sede)
    return sede;
  }

  filtrarObligaciones(): void {
    console.log('Filtrando obligaciones...');
    
    // Filtrar y mostrar solo una entrada única para obligaciones del contratista
    const uniqueObligacionesContratista = [];
    this.detalles.forEach(detalle => {
      if (detalle.obligacion_contratista !== null && uniqueObligacionesContratista.findIndex(item => item.obligacion_contratista === detalle.obligacion_contratista) === -1) {
        uniqueObligacionesContratista.push(detalle);
      }
    });
    this.obligacionesContratista = uniqueObligacionesContratista;
    
    // Filtrar y mostrar solo una entrada única para obligaciones contractuales
    const uniqueObligacionesContractuales = [];
    this.detalles.forEach(detalle => {
      if (detalle.obligaciones_contractuales !== null && uniqueObligacionesContractuales.findIndex(item => item.obligaciones_contractuales === detalle.obligaciones_contractuales) === -1) {
        uniqueObligacionesContractuales.push(detalle);
      }
    });
    this.obligacionesContractuales = uniqueObligacionesContractuales;
  
    console.log('Obligaciones del contratista:', this.obligacionesContratista);
    console.log('Obligaciones contractuales:', this.obligacionesContractuales);
  }
  
  
  filtrarPuestos(): void {
    console.log('Filtrando puestos...');
    
    // Filtrar y mostrar solo una entrada única para puestos de vigilancia humana (this.puestosVh)
    const uniquePuestosVh = [];
    this.detalles.forEach(detalle => {
      if (detalle.descripcionVHumana !== null && uniquePuestosVh.findIndex(item => item.descripcionVHumana === detalle.descripcionVHumana) === -1) {
        uniquePuestosVh.push({
          descripcionVHumana: detalle.descripcionVHumana,
          cantidad_puestov: detalle.cantidad_puestov,
          direccionSedeVHumana: detalle.direccionSedeVHumana
        });
      }
    });
    this.puestosVh = uniquePuestosVh;
  
    // Filtrar y mostrar solo una entrada única para puestos de vigilancia electrónica (this.puestosVE)
    const uniquePuestosVE = [];
    this.detalles.forEach(detalle => {
      if (detalle.descripcion !== null && uniquePuestosVE.findIndex(item => item.descripcion === detalle.descripcion) === -1) {
        uniquePuestosVE.push({
          descripcion: detalle.descripcion,
          cantidad: detalle.cantidad,
          direccionSedeVElectronica: detalle.direccionSedeVElectronica
        });
      }
    });
    this.puestosVE = uniquePuestosVE;
  
    console.log('Obligaciones del pvh:', this.puestosVh);
    console.log('Obligaciones pve:', this.puestosVE);
  }
  

  
  eliminarPuestoVigilanciaHumana(index: number): void {
    this.puestosVh.splice(index, 1); 
  }
  
  eliminarPuestoVigilanciaElectronica(index: number): void {
    this.puestosVE.splice(index, 1); 
  }
  
  eliminarObligacionContratista(index: number): void {
    this.obligacionesContratista.splice(index, 1); 
  }
  
  eliminarObligacionContractual(index: number): void {
    this.obligacionesContractuales.splice(index, 1); 
  }
  
 
  
}
