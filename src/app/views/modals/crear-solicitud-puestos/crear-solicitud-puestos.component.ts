import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { SedesService } from '../../../services/sedes/sedes.service';
import { PuestosEXcentroService } from '../../../services/PuestosXcentro/puestos-excentro.service';
import { PuestosVXcentroService } from '../../../services/PuestosXcentro/puestos-vxcentro.service';
import { SolicitudPuestosService } from '../../../services/solicitudes/solicitud-puestos.service';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';

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
  puestosDisponibles: any[] = [];
  puestosSolicitados: { tipo: string, descripcion: string, idempresa: number, idpuesto: number, cantidad: number }[] = [];
  nuevoPuesto: { descripcionVHumana?: string, descripcion?: string, descripcionSolicitud?: string, sede?: string } = {};

  constructor(
    private sedesService: SedesService,
    private _puestosEXcentroService: PuestosEXcentroService,
    private _puestosVXcentroService: PuestosVXcentroService,
    private solicitudPuestosService: SolicitudPuestosService
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
    this._puestosVXcentroService.obtenerPuestosVxCentro(idcentro_formacion).subscribe(
      (response) => {
        this.puestoVxCentro = response.data;
        if (this.tipoPuestoSeleccionado === 'humana') {
          this.filtrarPuestosDisponibles();
        }
        console.log(response.data);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  obtenerPuestosVEPorCentro(idcentro_formacion: number): void {
    this._puestosEXcentroService.obtenerPuestosExCentro(idcentro_formacion).subscribe(
      (response) => {
        this.puestoExCentro = response.data;
        if (this.tipoPuestoSeleccionado === 'electronica') {
          this.filtrarPuestosDisponibles();
        }
        console.log(response.data);
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
    this.filtrarPuestosDisponibles();
  }

  filtrarPuestosDisponibles(): void {
    if (this.tipoPuestoSeleccionado === 'humana') {
      this.puestosDisponibles = this.puestoVxCentro.filter(puesto =>
        !this.puestosSolicitados.some(solicitado => solicitado.descripcion === puesto.descripcionVHumana)
      );
    } else if (this.tipoPuestoSeleccionado === 'electronica') {
      this.puestosDisponibles = this.puestoExCentro.filter(puesto =>
        !this.puestosSolicitados.some(solicitado => solicitado.descripcion === puesto.descripcion)
      );
    }
  }

  onPuestoChange(): void {
    if (this.tipoPuestoSeleccionado === 'humana' && this.nuevoPuesto.descripcionVHumana) {
      const puestoSeleccionado = this.puestoVxCentro.find(puesto => puesto.descripcionVHumana === this.nuevoPuesto.descripcionVHumana);
      if (puestoSeleccionado) {
        this.puestosSolicitados.push({
          tipo: 'humana',
          descripcion: puestoSeleccionado.descripcionVHumana,
          idpuesto: puestoSeleccionado.idpuesto,
          idempresa: puestoSeleccionado.idempresa,
          cantidad: 1
        });
      }
    } else if (this.tipoPuestoSeleccionado === 'electronica' && this.nuevoPuesto.descripcion) {
      const puestoSeleccionado = this.puestoExCentro.find(puesto => puesto.descripcion === this.nuevoPuesto.descripcion);
      if (puestoSeleccionado) {
        this.puestosSolicitados.push({
          tipo: 'electronica',
          descripcion: puestoSeleccionado.descripcion,
          idpuesto: puestoSeleccionado.idpuesto,
          idempresa: puestoSeleccionado.idempresa,
          cantidad: 1
        });
      }
    }
    this.filtrarPuestosDisponibles();
  }

  onCantidadChange(index: number, nuevaCantidad: number): void {
    this.puestosSolicitados[index].cantidad = nuevaCantidad;
  }

  eliminarPuesto(index: number): void {
    this.puestosSolicitados.splice(index, 1);
    this.filtrarPuestosDisponibles();
  }

  onSubmit(): void {
    const fechaSolicitud = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en');

    const solicitudes = this.puestosSolicitados.map(puesto => ({
      idcentro_formacion: this.centroSeleccionado.idcentro_formacion,
      idempresa: puesto.idempresa,
      idpuesto: puesto.idpuesto,
      idsede_formacion: this.sedes.find(sede => sede.sede_formacion === this.nuevoPuesto.sede)?.idsede_formacion,
      tipo_puesto: puesto.tipo,
      cantidad_solicitada: puesto.cantidad,
      descripcion_Solicitud: this.nuevoPuesto.descripcionSolicitud,
      fecha_solicitud: fechaSolicitud
    }));

    solicitudes.forEach(solicitud => {
      this.solicitudPuestosService.crearsolicitudes_puestosl(solicitud).subscribe(
        (response) => {
          console.log('Solicitud creada:', response);
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'La solicitud ha sido creada exitosamente'
          });
          this.actualizarLista.emit();
          this.closeModal.emit();
        },
        (error) => {
          console.error('Error al crear la solicitud:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al crear la solicitud'
          });
        }
      );
    });
  }

  close(): void {
    this.closeModal.emit();
    this.puestoVxCentro = [];
    this.puestoExCentro = [];
  }
  
}
