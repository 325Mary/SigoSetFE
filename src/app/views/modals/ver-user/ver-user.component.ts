import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ver-user',
  templateUrl: './ver-user.component.html',
  styleUrls: ['./ver-user.component.css']
})
export class VerUserComponent {
  @Input() usuarioSeleccionado: any;
  @Output() closeModal = new EventEmitter<void>();
  constructor() { }

  
  close(): void {
    this.closeModal.emit();
  }

}
