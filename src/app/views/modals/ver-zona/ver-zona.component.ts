import { Component, Input, Output, EventEmitter } from '@angular/core';

interface Zona {
  idzona: number;
  Nombre_zona: string;
}

@Component({
  selector: 'app-ver-zona',
  templateUrl: './ver-zona.component.html',
  styleUrls: ['./ver-zona.component.css']
})
export class VerZonaComponent {
  @Input() zonaSelecionada: Zona; 
  @Output() closeModal = new EventEmitter<void>();

  constructor() { }
  

  close(): void {
    this.closeModal.emit();
  }
}
