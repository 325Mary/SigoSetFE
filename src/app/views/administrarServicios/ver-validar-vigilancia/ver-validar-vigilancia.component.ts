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
  selector: 'app-ver-validar-vigilancia',
  templateUrl: './ver-validar-vigilancia.component.html',
  styleUrls: ['./ver-validar-vigilancia.component.css']
})
export class VerValidarVigilanciaComponent implements OnInit {
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
  firmaUsuarioUrl: string | null = null;

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
          this.firmaUsuarioUrl = `http://localhost:3000/uploads/${response.data[0].firma_usuario}`;
console.log(this.firmaUsuarioUrl);

          console.log('Detalles del contrato por nombre:', this.detalles);
          
          // Asignar los datos obtenidos
          if (response.data && response.data.length > 0) {
            this.idcentro_formacion = response.data[0].idcentro_formacion;
            
            // Llamar métodos para obtener puestos
            this.obtenerPuestosVPorCentro(this.idcentro_formacion);
            this.obtenerPuestosVEPorCentro(this.idcentro_formacion);
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
  obtenerPuestosVPorCentro(idcentro_formacion: number): void {
    this._puestosVXCentroService.obtenerPuestosVxCentro(idcentro_formacion).subscribe(
      (response) => {
        this.puestoVxCentro = response.data;
        const idempresa = response.data[0].idempresa;
        // console.log('vxcentro:', response.data);
  
      },
      (error) => {
        // Manejar el error en caso de que ocurra
      }
    );
  }
  
  // obtenerCentroFormacion(idcentro_formacion: string): void {
  //   this.centroFormacionService.getCentroFormacion(idcentro_formacion).subscribe(
  //     (response) => {
  //       console.log('Centro de formación:', response.data);
  //       this.centroFormacion = response.data;
  //     },
  //     (error) => {
  //       console.error('Error al obtener el centro de formación:', error);
  //     }
  //   );
  // }
  obtenerPuestosVEPorCentro(idcentro_formacion: number): void {
    this._puestosEXCentroService.obtenerPuestosExCentro(idcentro_formacion).subscribe(
      (response) => {
        this.puestoExCentro = response.data;
        const idempresa = response.data[0].idempresa;
        // console.log('vexcentro:', response.data);
  
      },
      (error) => {
        // Manejar el error en caso de que ocurra
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
  

  
 
  async exportToPDF() {
    try {
      this.isGeneratingPDF = true;
      const data = document.querySelector('.container') as HTMLElement;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
  
      const margin = 10;
      const contentWidth = pdfWidth - margin * 2;
  
      let y = margin;
  
      const addCanvasToPDF = async (element: HTMLElement, yOffset: number) => {
        const canvas = await html2canvas(element, { scale: 1 });
        const imgData = canvas.toDataURL('image/png');
        const imgProps = pdf.getImageProperties(imgData);
        const imgHeight = (imgProps.height * contentWidth) / imgProps.width;
  
        if (yOffset + imgHeight > pdfHeight - margin) {
          pdf.addPage();
          yOffset = margin;
        }
  
        pdf.addImage(imgData, 'PNG', margin, yOffset, contentWidth, imgHeight);
        return yOffset + imgHeight;
      };
  
      const fileInput = document.querySelector('input[type="file"]') as HTMLElement;
      const exportButton = document.querySelector('.export-button') as HTMLElement;
      const logoButton = document.querySelector('.logo-button') as HTMLElement;
  
      if (fileInput) fileInput.style.display = 'none';
      if (exportButton) exportButton.style.display = 'none';
      if (logoButton) logoButton.style.display = 'none';
  
      const sections = data.querySelectorAll('.section');
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].parentElement === data) {
          y = await addCanvasToPDF(sections[i] as HTMLElement, y);
        }
      }
  
      const signatureBlock = document.querySelector('.signature-container') as HTMLElement;
      const firmaPreview = document.querySelector('.firma-preview') as HTMLImageElement;
  
      if (signatureBlock && firmaPreview) {
        const img = new Image();
        img.src = firmaPreview.src;
  
        // Renderizar firma y descripción juntas en un solo bloque
        const canvasSignature = await html2canvas(signatureBlock, { scale: 1 });
        const signatureImgData = canvasSignature.toDataURL('image/png');
        const signatureImgProps = pdf.getImageProperties(signatureImgData);
        const signatureImgHeight = (signatureImgProps.height * contentWidth) / signatureImgProps.width;
  
        if (y + signatureImgHeight > pdfHeight - margin) {
          pdf.addPage();
          y = margin;
        }
  
        // Agregar el bloque de descripción
        pdf.addImage(signatureImgData, 'PNG', margin, y, contentWidth, signatureImgHeight);
        
        // Añadir firma junto al bloque de descripción
        pdf.addImage(img.src, 'PNG', margin + contentWidth / 4, y, 30, 0);
  
        // Actualizar posición vertical
        y += Math.max(signatureImgHeight, 10); // Ajusta el espacio después de la firma
  
        const currentDate = new Date();
        const fileName = `informe_${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)}-${currentDate.getDate()}.pdf`;
  
        pdf.save(fileName);
  
        if (fileInput) fileInput.style.display = 'block';
        if (exportButton) exportButton.style.display = 'block';
        if (logoButton) logoButton.style.display = 'block';
  
        this.isGeneratingPDF = false;
  
        this.router.navigate(['/ListaInformes']);
      }
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      this.isGeneratingPDF = false;
    }
  }
  
}
 