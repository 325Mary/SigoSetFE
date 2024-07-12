import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { SolicitudPuestosService } from '../../../services/solicitudes/solicitud-puestos.service'

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
    console.log(idCentro);
    
    this.solicitudPuestosService.obtenersolicitudes_puestoslPorCentro(idCentro).subscribe(
      (response) => {
        this.solicitudes = response.data;
        console.log(this.solicitudes);
        
      },
      (error) => {
        console.error('Error al cargar solicitudes', error);
      }
    );
  }

 

  actualizarSolicitud(solicitud: any): void {
    // Lógica para actualizar la solicitud
    console.log('Actualizar solicitud', solicitud);
  }

  eliminarSolicitud(id: number): void {
    this.solicitudPuestosService.eliminarsolicitudes_puestoslPorId(id).subscribe(
      () => {
        console.log('Solicitud eliminada');
        this.cargarSolicitudes();
      },
      (error) => {
        console.error('Error al eliminar la solicitud', error);
      }
    );
  }

  close(): void {
    this.closeModal.emit();
  }
}
