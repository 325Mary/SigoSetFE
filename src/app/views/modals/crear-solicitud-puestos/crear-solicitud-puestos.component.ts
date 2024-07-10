import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { SedesService } from '../../../services/sedes/sedes.service';
import { PuestosEXcentroService } from '../../../services/PuestosXcentro/puestos-excentro.service';
import { PuestosVXcentroService } from '../../../services/PuestosXcentro/puestos-vxcentro.service';

@Component({
  selector: 'app-crear-solicitud-puestos',
  templateUrl: './crear-solicitud-puestos.component.html',
  styleUrls: ['./crear-solicitud-puestos.component.css']
})
export class CrearSolicitudPuestosComponent {
  @Input() centroSeleccionado: any;
  @Output() actualizarLista = new EventEmitter<void>();
  @Input() mostrarModalSolicitarPuestos: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  puestoVxCentro: any[] = [];
  puestoExCentro: any[] = [];
  sedes: any[] = [];
  tipoPuestoSeleccionado: string;
  puestosSolicitados: { puesto: string, cantidad: number }[] = [];

  constructor(
    private sedesService: SedesService,
    private _puestosEXCentroService: PuestosEXcentroService,
    private _puestosVXCentroService: PuestosVXcentroService,
  ) { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.centroSeleccionado && changes.centroSeleccionado.currentValue) {
      this.obtenerSedesPorCentroFormacion(changes.centroSeleccionado.currentValue.idcentro_formacion);
      this.obtenerPuestosVPorCentro(changes.centroSeleccionado.currentValue.idcentro_formacion);
      this.obtenerPuestosVEPorCentro(changes.centroSeleccionado.currentValue.idcentro_formacion);
    }
  }

  obtenerPuestosVPorCentro(idcentro_formacion: number): void {
    this._puestosVXCentroService.obtenerPuestosVxCentro(idcentro_formacion).subscribe(
      (response) => {
        this.puestoVxCentro = response.data;
        console.log('vxcentro:', response.data);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  obtenerPuestosVEPorCentro(idcentro_formacion: number): void {
    this._puestosEXCentroService.obtenerPuestosExCentro(idcentro_formacion).subscribe(
      (response) => {
        this.puestoExCentro = response.data;
        console.log('vexcentro:', response.data);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  obtenerSedesPorCentroFormacion(idCentroFormacion: string): void {
    this.sedesService.obtenerSedesPorCentroFormacion(idCentroFormacion).subscribe(
      (sedes) => {
        this.sedes = sedes;
        console.log(sedes);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onTipoPuestoChange(tipoPuesto: string): void {
    this.tipoPuestoSeleccionado = tipoPuesto;
  }

  agregarPuesto(puesto: string, cantidad: number): void {
    if (puesto && cantidad > 0) {
      this.puestosSolicitados.push({ puesto, cantidad });
    }
  }

  eliminarPuesto(index: number): void {
    this.puestosSolicitados.splice(index, 1);
  }

  onSubmit(): void {
    if (this.puestosSolicitados.length > 0) {
      const solicitudData = {
        puestos: this.puestosSolicitados,
        centroSeleccionado: this.centroSeleccionado,
      };
      console.log('Solicitud enviada:', solicitudData);
      this.actualizarLista.emit();
      this.closeModal.emit();
    } else {
      console.log('No se han agregado puestos a la solicitud');
    }
  }
}
