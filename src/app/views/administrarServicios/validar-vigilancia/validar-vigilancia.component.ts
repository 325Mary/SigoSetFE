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
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // Obtener el ID del centro de los parámetros de ruta
      this.centroId = params['idcentro_formacion'];
      // Llamar a las funciones para obtener los puestos después de obtener el ID del centro
      this.obtenerPuestosVPorCentro(Number(this.centroId));
      this.obtenerPuestosVEPorCentro(Number(this.centroId));
      this.obtenerSedesPorCentroFormacion(String(this.centroId));
      this.obtenerCentroFormacion(String(this.centroId));
    });
    this.fechaActual = this.datePipe.transform(new Date(), 'dd \'de\' MMMM \'de\' yyyy');
  }
  validarTodosSeleccionados(): void {
    // Verifica que todas las opciones de los datalists estén seleccionadas
    this.todosSeleccionados = true;
  
    // Verifica los datalists de obligaciones del contratista
    this.obligacionesContratista.forEach(obligacion => {
      if (!obligacion.cumple) {
        this.todosSeleccionados = false;
      }
    });
  
    // Verifica los datalists de obligaciones contractuales
    this.obligacionesContractuales.forEach(obligacion => {
      if (!obligacion.cumple2) {
        this.todosSeleccionados = false;
      }
    });
  }
  

  obtenerPuestosVPorCentro(centroId: number): void {
    this._puestosVXCentroService.obtenerPuestosVxCentro(centroId).subscribe(
      (response) => {
        this.puestoVxCentro = response.data;
        const idempresa = response.data[0].idempresa;
        console.log('vxcentro:', response.data);
        console.log('empresa:', idempresa);

        // Llamar al método para obtener las obligaciones del centro
        this.obtenerObligacionesPorEmpresa(idempresa);
      },
      (error) => {
        // Manejar el error en caso de que ocurra
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

        // Llamar al método para obtener las obligaciones del centro
        this.obtenerObligacionesPorEmpresa(idempresa);
      },
      (error) => {
        // Manejar el error en caso de que ocurra
      }
    );
  }

  obtenerObligacionesPorEmpresa(idempresa: number): void {
    this.informeS.obtenerObliXcentro(idempresa).subscribe(
      (obligacionesResponse) => {
        console.log('Respuesta de obtenerObliXcentro:', obligacionesResponse);
        // Filtrar y asignar las obligaciones a los arrays correspondientes
        this.obligacionesContratista = obligacionesResponse.filter(obligacion => obligacion.idobligaciones_contratista !== null);
        this.obligacionesContractuales = obligacionesResponse.filter(obligacion => obligacion.idobligaciones_contractuales !== null);
      },
      (error) => {
        console.error('Error al obtener las obligaciones:', error);
        // Aquí puedes manejar el error de acuerdo a tus necesidades
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
    const sede = this.sedes.find(s => s.id === sedeId); // Ajusta según el nombre del campo identificador
    return sede ? ` ${sede.dir_sede_formacion}` : 'N/A';
  }

  obtenerNombreEmpresa(): string {
    // Suponiendo que la información de la empresa está disponible en los arreglos puestoVxCentro y puestoExCentro
    const empresa = this.puestoVxCentro.length > 0 ? this.puestoVxCentro[0].nombre_empresa :
      this.puestoExCentro.length > 0 ? this.puestoExCentro[0].nombre_empresa : 'N/A';
    return empresa;
  }

  obtenerNombreSede(): string {
    // Suponiendo que la información de la sede está disponible en el arreglo de sedes
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

  async exportToPDF() {
    try {
      this.isGeneratingPDF = true;
      const data = document.querySelector('.container') as HTMLElement;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
  
      const margin = 10; // Define una constante para el margen
      const contentWidth = pdfWidth - margin * 2; // Ajusta el ancho para el margen
  
      let y = margin; // Comienza con el margen superior
  
      // Función para crear un canvas y agregarlo al PDF
      const addCanvasToPDF = async (element: HTMLElement, yOffset: number) => {
        const canvas = await html2canvas(element, { scale: 1 });
        const imgData = canvas.toDataURL('image/png');
        const imgProps = pdf.getImageProperties(imgData);
        const imgHeight = (imgProps.height * contentWidth) / imgProps.width;
  
        if (yOffset + imgHeight > pdfHeight - margin) { // Ajuste para el margen inferior
          pdf.addPage();
          yOffset = margin; // Reinicia en el margen superior en la nueva página
        }
  
        pdf.addImage(imgData, 'PNG', margin, yOffset, contentWidth, imgHeight); // Agrega la imagen con el margen izquierdo
        return yOffset + imgHeight;
      };
  
      // Oculta temporalmente el input de archivo y los botones
      const fileInput = document.querySelector('input[type="file"]') as HTMLElement;
      const exportButton = document.querySelector('.export-button') as HTMLElement;
      const logoButton = document.querySelector('.logo-button') as HTMLElement;
  
      if (fileInput) fileInput.style.display = 'none';
      if (exportButton) exportButton.style.display = 'none';
      if (logoButton) logoButton.style.display = 'none';
  
      // Captura cada sección sin duplicar
      const sections = data.querySelectorAll('.section');
      for (let i = 0; i < sections.length; i++) {
        // Asegúrate de que cada sección se procese una vez
        if (sections[i].parentElement === data) {
          y = await addCanvasToPDF(sections[i] as HTMLElement, y);
        }
      }
  
      // Agrega el bloque de firma al PDF
      const signatureBlock = document.querySelector('.signature-container') as HTMLElement;
      if (signatureBlock) {
        y = await addCanvasToPDF(signatureBlock, y);
      }
  
      const currentDate = new Date();
      const fileName = `informe_${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)}-${currentDate.getDate()}.pdf`;
  
      // Guarda el PDF con el nombre de archivo generado
      pdf.save(fileName);
  
      // Establece isGeneratingPDF en false para cerrar la superposición
      this.isGeneratingPDF = false;
  
      // Muestra el input de archivo y los botones nuevamente
      if (fileInput) fileInput.style.display = 'block';
      if (exportButton) exportButton.style.display = 'block';
      if (logoButton) logoButton.style.display = 'block';
  
      // Navega a una ruta específica
      this.router.navigate(['/listaCentroFormacion']);
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      this.isGeneratingPDF = false;
    }
  }
  
  
    
    selectAllCheckboxes(checked: boolean): void {
      const checkboxes = document.querySelectorAll('.table.table-bordered.section input[type="checkbox"]');
      checkboxes.forEach((checkbox: HTMLInputElement) => {
        checkbox.checked = checked;
      });
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
        // Definir variables auxiliares para almacenar los detalles de contrato
        let detallesContrato: any[] = [];
    
        // Iterar sobre las obligaciones del contratista y los puestos de vigilancia humana
        this.obligacionesContratista.forEach((obligacion) => {
          this.puestoVxCentro.forEach((puestoVigilancia) => {
            detallesContrato.push({
              idcertificacion_centrof: this.idcertificacion_centrof,
              idobligaciones_contrato: obligacion.idobligaciones_contrato,
              cumple: obligacion.cumple,
              nombreDetalleContrato: `informe_${this.datePipe.transform(new Date(), 'yyyy-MM-dd')}`,
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
    
        // Iterar sobre las obligaciones contractuales y los puestos de vigilancia electrónica
        this.obligacionesContractuales.forEach((obligacion) => {
          this.puestoExCentro.forEach((puestoElectronico) => {
            detallesContrato.push({
              idcertificacion_centrof: this.idcertificacion_centrof,
              idobligaciones_contrato: obligacion.idobligaciones_contrato,
              cumple: obligacion.cumple2,
              nombreDetalleContrato: `informe_${this.datePipe.transform(new Date(), 'yyyy-MM-dd')}`,
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
    
        // Llama a tu servicio para crear los detalles de contrato en una sola operación
        detallesContrato.forEach(detalle => {
          this.detalleContratoService.crearDetalleContrato(detalle).subscribe(
            (response) => {
              console.log('Respuesta de crear detalle contrato:', response);
              // Aquí puedes manejar la respuesta si es necesario
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
        // Manejar el caso en que idcertificacion_centrof no esté definido
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
  
