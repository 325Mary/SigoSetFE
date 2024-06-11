import { Component, Input, Output, EventEmitter, SimpleChanges  } from '@angular/core';
import { SedesService } from '../../../services/sedes/sedes.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-list-sedes-xcentro',
  templateUrl: './list-sedes-xcentro.component.html',
  styleUrls: ['./list-sedes-xcentro.component.css']
})
export class ListSedesXcentroComponent {

  @Input() centroSeleccionado: any;
  @Output() actualizarLista = new EventEmitter<void>();
  @Input() mostrarModal: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  sedes: any[] = [];
  
  constructor(private sedesService: SedesService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.centroSeleccionado && changes.centroSeleccionado.currentValue) {
      this.obtenerSedesPorCentroFormacion(changes.centroSeleccionado.currentValue.idcentro_formacion);
    }
  }

  obtenerSedesPorCentroFormacion(idCentroFormacion: string): void {
    this.sedesService.obtenerSedesPorCentroFormacion(idCentroFormacion)
      .pipe(
        catchError(error => {
          console.error('Error al obtener sedes por centro de formación:', error);
          return of([]);
        })
      )
      .subscribe(sedes => {
        this.sedes = sedes;
      });
  }

  close(): void {
    this.closeModal.emit();
  }
}
