import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ver-empresa',
  templateUrl: './ver-empresa.component.html',
  styleUrls: ['./ver-empresa.component.css']
})
export class VerEmpresaComponent  {
  @Input() empresaSeleccionada: any; 
  @Output() closeModal = new EventEmitter<void>();
  @Output() empresaActualizada = new EventEmitter<void>();
  constructor() { }

  
  close(): void {
    this.closeModal.emit();
  }
}
