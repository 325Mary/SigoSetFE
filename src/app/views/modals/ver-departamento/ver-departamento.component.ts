import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


interface Departamento{
  iddepartamento:number;
  departamento:string;
}
@Component({
  selector: 'app-ver-departamento',
  templateUrl: './ver-departamento.component.html',
  styleUrls: ['./ver-departamento.component.css']
})
export class VerDepartamentoComponent {
  @Input() departamentoSeleccionado: Departamento;
  @Output() closeModal = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }
  close():void{
    this.closeModal.emit()
  }

}
