import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { PuestosEXcentroService } from '../../../services/PuestosXcentro/puestos-excentro.service';
import { PuestosVXcentroService } from '../../../services/PuestosXcentro/puestos-vxcentro.service';
import { PuestosVigilanciaService } from '../../../services/puestosvigilancia/puestosVig.service';
import { VigilanciaElectronicaService } from '../../../services/PuestosElectronicos/vigilancia-electronica.service';
import { ActivatedRoute } from '@angular/router';
import { EmpresaService } from '../../../services/empresas/empresa.service';
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

  constructor(
    private _puestosEXCentroService: PuestosEXcentroService,
    private _puestosVXCentroService: PuestosVXcentroService,
    private puestosService: PuestosVigilanciaService,
    private vigilanciaElectronicaS: VigilanciaElectronicaService,
    private route: ActivatedRoute,
    private empresaService: EmpresaService
  ) { }

  ngOnInit(): void {
    this.obtenerPuestos();
    this.obtenerVigilanciaElectronica();

    this.route.params.subscribe(params => {
      // Obtener el ID del centro de los parámetros de ruta
      this.centroId = params['idcentro_formacion'];
      console.log('id:', this.centroId);
      // Ahora puedes usar este ID para cargar la información del centro o realizar otras operaciones necesarias
    });
    this.obtenerEmpresas();
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
        this.puestos = data.data[0];
        // Actualizar el dataSource con los datos obtenidos, si es necesario
      },
      (error) => {
        console.error(error);
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

  onPuestoVigilanciaSelected(idpuesto_vigilancia: any): void {
    const selectedId = Number(idpuesto_vigilancia);
    const puestoSeleccionado = this.puestos.find(puesto => puesto.idpuesto_vigilancia === selectedId);
    if (puestoSeleccionado) {
      if (!puestoSeleccionado.seleccionado) {
        puestoSeleccionado.cantidad = 0;
        puestoSeleccionado.seleccionado = true;
        this.puestosSeleccionadosVigilancia.push(puestoSeleccionado);
      } else {
        console.log('Este puesto ya ha sido seleccionado.');
      }
    }
  }

  onVigilanciaElectronicaSelected(idvigilancia_electronica: any): void {
    const selectedId = Number(idvigilancia_electronica);
    const puestoSeleccionado = this.vigiElectronica.find(vigiElectronica => vigiElectronica.idvigilancia_electronica === selectedId);
    if (puestoSeleccionado) {
      if (!puestoSeleccionado.seleccionado) {
        puestoSeleccionado.cantidad = 0;
        puestoSeleccionado.seleccionado = true;
        this.puestosSeleccionadosElectronica.push(puestoSeleccionado);
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

  guardarCambios(): void {
    const centroFormacionId = this.centroId;
    const idempresaSeleccionada = this.empresaSeleccionada;
    // Guardar cambios para puestos de vigilancia
    this.puestosSeleccionadosVigilancia.forEach(puesto => {
      if (puesto.cantidad > 0) {
        this._puestosVXCentroService.crearPuestoVxCentro({
          idcentro_formacion: centroFormacionId,
          idempresa: idempresaSeleccionada,
          idpuesto_vigilancia: puesto.idpuesto_vigilancia,
          cantidad_puestov: puesto.cantidad
        }).subscribe(() => {
          console.log('Cantidad actualizada para puesto de vigilancia.');
        }, (error) => {
          console.error('Error al actualizar cantidad para puesto de vigilancia:', error);
        });
      }
    });
    // Guardar cambios para puestos de electrónica
    this.puestosSeleccionadosElectronica.forEach(vigiElect => {
      if (vigiElect.cantidad > 0) {
        this._puestosEXCentroService.crearPuestoVExCentro({
          idcentro_formacion: centroFormacionId,
          idempresa: idempresaSeleccionada,
          idvigilancia_electronica: vigiElect.idvigilancia_electronica,
          cantidad: vigiElect.cantidad,
        }).subscribe(() => {
          console.log('Cantidad actualizada para puesto de electrónica.');
        }, (error) => {
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
    // Aquí puedes agregar lógica para guardar los cambios del formulario
    console.log("Guardando cambios del formulario de tipo: " + tipo);

    // Por ahora, simplemente reseteamos la visibilidad del formulario
    if (tipo === 'humano') {
      this.mostrarFormularioHumano = false;
    } else if (tipo === 'electronica') {
      this.mostrarFormularioElectronica = false;
    }
  }
}
