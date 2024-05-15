import { Component, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-crear-puesto',
  templateUrl: './crear-puesto.component.html',
  styleUrls: ['./crear-puesto.component.css']
})
export class CrearPuestoComponent implements OnInit {
  @Output() modalClose = new EventEmitter<void>();
  constructor() { }
  ngOnInit(): void { }

  closeModal(): void {
    this.modalClose.emit();
  }
}

