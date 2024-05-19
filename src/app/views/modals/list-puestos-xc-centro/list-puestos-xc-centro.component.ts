import { Component, ViewChild, ElementRef, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { PuestosEXcentroService } from '../../../services/PuestosXcentro/puestos-excentro.service';
import { PuestosVXcentroService } from '../../../services/PuestosXcentro/puestos-vxcentro.service';

@Component({
  selector: 'app-list-puestos-xc-centro',
  templateUrl: './list-puestos-xc-centro.component.html',
  styleUrls: ['./list-puestos-xc-centro.component.css']
})
export class ListPuestosXcCentroComponent implements OnInit, OnChanges {
  @Input() centroSeleccionado: any;
  @Output() actualizarLista = new EventEmitter<void>();
  @Input() mostrarModal: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  puestoVxCentro: any[] = [];
  puestoExCentro: any[] = [];

  constructor(
    private _puestosEXCentroService: PuestosEXcentroService,
    private _puestosVXCentroService: PuestosVXcentroService
  ) { }

  ngOnInit(): void {
    if (this.centroSeleccionado) {
      this.obtenerPuestosVPorCentro(this.centroSeleccionado.idcentro_formacion);
      this.obtenerPuestosVEPorCentro(this.centroSeleccionado.idcentro_formacion);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.centroSeleccionado && changes.centroSeleccionado.currentValue) {
      const idcentro_formacion = changes.centroSeleccionado.currentValue.idcentro_formacion;
      this.obtenerPuestosVPorCentro(idcentro_formacion);
      this.obtenerPuestosVEPorCentro(idcentro_formacion);
    }
  }

  obtenerPuestosVPorCentro(idcentro_formacion: number): void {
    this._puestosVXCentroService.obtenerPuestosVxCentro(idcentro_formacion).subscribe(
      (response) => {
        this.puestoVxCentro = response.data;
      },
      (error) => {
      }
    );
  }

  obtenerPuestosVEPorCentro(idcentro_formacion: number): void {
    this._puestosEXCentroService.obtenerPuestosExCentro(idcentro_formacion).subscribe(
      (response) => {
        this.puestoExCentro = response.data;
      },
      (error) => {
      }
    );
  }
  close(): void {
    this.closeModal.emit();
  }
}
