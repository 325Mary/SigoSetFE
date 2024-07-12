import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { SolicitudPuestosService } from '../../../services/solicitudes/solicitud-puestos.service';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-administrar-solicitud-xcentro',
  templateUrl: './administrar-solicitud-xcentro.component.html',
  styleUrls: ['./administrar-solicitud-xcentro.component.css']
})
export class AdministrarSolicitudXcentroComponent implements OnInit, OnChanges {
  @Input() centroSeleccionado: any;
  @Output() actualizarLista = new EventEmitter<void>();
  @Input() mostrarModalAdminSolicitarPuestos: boolean = false;
  @Output() closeModal = new EventEmitter<void>();

  solicitudes: any[] = [];
  mostrarModalRechazoFlag: boolean = false;
  motivoRechazo: string = '';
  solicitudActual: any;
  pageSize: number=4;
  currentPage: number = 1;

  constructor(private solicitudPuestosService: SolicitudPuestosService) { }

  ngOnInit(): void {
    if (this.centroSeleccionado) {
      this.cargarSolicitudes();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.centroSeleccionado && changes.centroSeleccionado.currentValue) {
      this.cargarSolicitudes();
    }
  }

  cargarSolicitudes(): void {
    const idCentro = this.centroSeleccionado.idcentro_formacion;
    this.solicitudPuestosService.obtenersolicitudes_puestoslPorCentro(idCentro).subscribe(
      (response) => {
        this.solicitudes = response.data;
      },
      (error) => {
        console.error('Error al cargar solicitudes', error);
      }
    );
  }

  aprobarSolicitud(solicitud: any): void {
    const fechaActual = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en');
    this.solicitudPuestosService.actualizarEstadoSolicitud(
      solicitud.idsolicitud_puesto,
      'aprobada',
      'solicitud aprobada',
      fechaActual
    ).subscribe(
      () => {
        this.cargarSolicitudes();
      },
      (error) => {
        console.error('Error al aprobar solicitud', error);
      }
    );
  }

  mostrarModalRechazo(solicitud: any): void {
    this.solicitudActual = solicitud;
    this.motivoRechazo = '';
    this.mostrarModalRechazoFlag = true;
  }

  rechazarSolicitud(): void {
    if (this.motivoRechazo.trim()) {
      const fechaActual = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en');
      this.solicitudPuestosService.actualizarEstadoSolicitud(
        this.solicitudActual.idsolicitud_puesto,
        'rechazada',
        this.motivoRechazo,
        fechaActual
      ).subscribe(
        () => {
          this.cargarSolicitudes();
          this.cerrarModalRechazo();
        },
        (error) => {
          console.error('Error al rechazar solicitud', error);
        }
      );
    } else {
      alert('Debe ingresar un motivo para el rechazo.');
    }
  }

  cerrarModalRechazo(): void {
    this.mostrarModalRechazoFlag = false;
  }

  close(): void {
    this.closeModal.emit();
  }
  pageChange(event: number): void {
    this.currentPage = event;
  }
  
}
