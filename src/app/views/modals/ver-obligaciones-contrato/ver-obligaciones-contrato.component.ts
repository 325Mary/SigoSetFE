import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ver-obligaciones-contrato',
  templateUrl: './ver-obligaciones-contrato.component.html',
  styleUrls: ['./ver-obligaciones-contrato.component.css']
})
export class VerObligacionesContratoComponent {

  @Input() obligacionSeleccionada: any; 
  @Output() closeModal = new EventEmitter<void>();
  @Input() mostrarModal: boolean = false;

  constructor() { }

  
  close(): void {
    this.closeModal.emit();
  }
}
