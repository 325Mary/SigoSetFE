import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { PuestosEXcentroService } from '../../../services/PuestosXcentro/puestos-excentro.service';
import { PuestosVXcentroService } from '../../../services/PuestosXcentro/puestos-vxcentro.service';
import { PuestosVigilanciaService } from '../../../services/puestosvigilancia/puestosVig.service';
import { VigilanciaElectronicaService } from '../../../services/PuestosElectronicos/vigilancia-electronica.service';
import { ActivatedRoute, Router } from '@angular/router'; 
import { EmpresaService } from '../../../services/empresas/empresa.service';
import {CentroFormacionService} from '../../../services/centro-formacion/centro-formacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignar-puestos-v',
  templateUrl: './asignar-puestos-v.component.html',
  styleUrls: ['./asignar-puestos-v.component.css']
})
export class AsignarPuestosVComponent {
  @Input() centroSeleccionado: any;
  @Output() actualizarLista = new EventEmitter<void>();
  @Input() mostrarModal: boolean;
  puestoVxCentro: any;
  puestoExCentro: any;
  puestos: any[] = [];
  centro: any[] = [];
  vigiElectronica: any[] = [];
  servicioSeleccionado: string;
  puestosSeleccionados: any[] = [];
  openSelect: string | null = null;
  centroId: string;
  puestosSeleccionadosVigilancia: any[] = [];
  puestosSeleccionadosElectronica: any[] = [];
  empresas: any[];
  empresaSeleccionada: any;
  mostrarFormularioHumano: boolean = true;
  mostrarFormularioElectronica: boolean = false;
  formularioVisible: boolean = false;
  nombreCentro: string;

  constructor(
    private _puestosEXCentroService: PuestosEXcentroService,
    private _puestosVXCentroService: PuestosVXcentroService,
    private puestosService: PuestosVigilanciaService,
    private vigilanciaElectronicaS: VigilanciaElectronicaService,
    private route: ActivatedRoute,
    private router: Router,
    private empresaService: EmpresaService,
    private centroService: CentroFormacionService
  ) { }

  ngOnInit(): void {
    this.obtenerPuestos();
    this.obtenerVigilanciaElectronica();

    this.route.params.subscribe(params => {
      this.centroId = params['idcentro_formacion'];
      console.log('id:', this.centroId);
      this.obtenerinforXcentro(this.centroId);
    });
    this.obtenerEmpresas();
    this.obtenerinforXcentro(this.centroId);
  }

  obtenerEmpresas() {
    this.empresaService.obtenerEmpresas().subscribe(
      (response) => {
        this.empresas = response.data[0];
        console.log('empresas', this.empresas);
      },
      (error) => {
        console.error('Error al obtener perfiles:', error);
      }
    );
  }

  obtenerPuestos(): void {
    this.puestosService.obtenerPuestos().subscribe(
      (data) => {
        this.puestos = data.data[0].map(puesto => {
          return {
            idpuesto_vigilancia: puesto.idpuesto_vigilancia,
            descripcion_puesto: puesto.descripcion_puesto,
            seleccionado: false,
            cantidad: 0
          };
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  obtenerinforXcentro(centroId: string): void {
    this.centroService.getCentroFormacion(centroId).subscribe(
      (response) => {
        this.centro = response.data;
        this.nombreCentro = response.data.centro_formacion;
        console.log('centroooo:', this.centro);
      },
      (error) => {
        console.error('Error al obtener centro:', error);
      }
    );
  }

  obtenerVigilanciaElectronica(): void {
    this.vigilanciaElectronicaS.obtenerVigilaciaElectronica().subscribe(
      (data) => {
        this.vigiElectronica = data.data[0];
        console.log('vig:', this.vigiElectronica);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onEmpresaSelected(event: any): void {
    const selectedCompanyName = event.target.value;
    const selectedCompany = this.empresas.find(empresa => empresa.nombre_empresa === selectedCompanyName);
    if (selectedCompany) {
      this.empresaSeleccionada = selectedCompany.idempresa;
      console.log('Id de la empresa seleccionada:', this.empresaSeleccionada);
    }
  }
  
  

  onPuestoVigilanciaSelected(event: any): void {
    const selectedValue = event.target.value;
    const selectedOption = this.puestos.find(puesto => puesto.descripcion_puesto === selectedValue);
    if (selectedOption) {
      if (!selectedOption.seleccionado) {
        selectedOption.cantidad = 0;
        selectedOption.seleccionado = true;
        this.puestosSeleccionadosVigilancia.push(selectedOption);
      } else {
        console.log('Este puesto ya ha sido seleccionado.');
      }
    }
  }

  onVigilanciaElectronicaSelected(event: any): void {
    const selectedValue = event.target.value;
    const selectedOption = this.vigiElectronica.find(vigiElect => vigiElect.descripcion === selectedValue);
    if (selectedOption) {
      if (!selectedOption.seleccionado) {
        selectedOption.cantidad = 0;
        selectedOption.seleccionado = true;
        this.puestosSeleccionadosElectronica.push(selectedOption);
      } else {
        console.log('Este puesto ya ha sido seleccionado.');
      }
    }
  }

  isSelectOpen(selectId: string): boolean {
    return this.openSelect === selectId;
  }

  aumentarCantidad(puesto: any): void {
    puesto.cantidad++;
  }

  reloadComponent() {
    this.router.navigate([this.router.url], { skipLocationChange: true });
  }

  guardarCambiosVigilanciaHumana(): void {
    const centroFormacionId = this.centroId;
    const idempresaSeleccionada = this.empresaSeleccionada; // Utiliza el id de empresa seleccionada
    let saveCount = 0;
  
    this.puestosSeleccionadosVigilancia.forEach(puesto => {
      if (puesto.cantidad > 0) {
        this._puestosVXCentroService.crearPuestoVxCentro({
          idcentro_formacion: centroFormacionId,
          idempresa: idempresaSeleccionada, // Pasa el id de empresa seleccionada
          idpuesto_vigilancia: puesto.idpuesto_vigilancia,
          cantidad_puestov: puesto.cantidad
        }).subscribe(() => {
          saveCount++;
          if (saveCount === this.puestosSeleccionadosVigilancia.length) {
            Swal.fire('¡Éxito!', 'Cantidad actualizada para puesto de vigilancia humana.', 'success');
            console.log('Cantidad actualizada para puesto de vigilancia.');
            this.puestosSeleccionadosVigilancia = [];
            this.reloadComponent();
          }
        }, (error) => {
          Swal.fire('Error', error.error.message || 'Hubo un error al actualizar la cantidad para puesto de vigilancia.', 'error');
          console.error('Error al actualizar cantidad para puesto de vigilancia:', error);
        });
      }
    });
  }
  
  guardarCambiosVigilanciaElectronica(): void {
    const centroFormacionId = this.centroId;
    const idempresaSeleccionada = this.empresaSeleccionada; // Utiliza el id de empresa seleccionada
    let saveCount = 0;
  
    this.puestosSeleccionadosElectronica.forEach(vigiElect => {
      if (vigiElect.cantidad > 0) {
        this._puestosEXCentroService.crearPuestoVExCentro({
          idcentro_formacion: centroFormacionId,
          idempresa: idempresaSeleccionada, // Pasa el id de empresa seleccionada
          idvigilancia_electronica: vigiElect.idvigilancia_electronica,
          cantidad: vigiElect.cantidad,
        }).subscribe(() => {
          saveCount++;
          if (saveCount === this.puestosSeleccionadosElectronica.length) {
            Swal.fire('¡Éxito!', 'Cantidad actualizada para puesto de vigilancia electrónica.', 'success');
            console.log('Cantidad actualizada para puesto de electrónica.');
            this.puestosSeleccionadosElectronica = [];
            this.reloadComponent();
          }
        }, (error) => {
          Swal.fire('Error', error.error.message || 'Hubo un error al actualizar la cantidad para puesto de electrónica.', 'error');
          console.error('Error al actualizar cantidad para puesto de electrónica:', error);
        });
      }
    });
  }
  

  mostrarFormulario(tipo: string) {
    if (tipo === 'humano') {
      this.mostrarFormularioHumano = true;
      this.mostrarFormularioElectronica = false;
    } else if (tipo === 'electronica') {
      this.mostrarFormularioHumano = false;
      this.mostrarFormularioElectronica = true;
    }
  }

  guardarCambios1(tipo: string) {
    console.log("Guardando cambios del formulario de tipo: " + tipo);
    if (tipo === 'humano') {
      this.mostrarFormularioHumano = false;
    } else if (tipo === 'electronica') {
      this.mostrarFormularioElectronica = false;
    }
  }
  eliminarPuesto(puesto: any): void {
    const index = this.puestosSeleccionadosVigilancia.indexOf(puesto);
    if (index !== -1) {
      this.puestosSeleccionadosVigilancia.splice(index, 1);
      // Reducir la cantidad si es mayor que cero
      if (puesto.cantidad > 0) {
        puesto.cantidad--;
      }
    }
  }
  reducirCantidad(puesto: any): void {
    if (puesto.cantidad > 0) {
      puesto.cantidad--;
    }
  }
  
}
