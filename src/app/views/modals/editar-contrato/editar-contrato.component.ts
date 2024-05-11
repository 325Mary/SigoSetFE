import { Component, Input, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-contrato',
  templateUrl: './editar-contrato.component.html',
  styleUrls: ['./editar-contrato.component.css']
})
export class EditarContratoComponent {
  @Input() contratoSeleccionado: any; 
  @Output() closeModal = new EventEmitter<void>();
  @Output() actualizarContratos = new EventEmitter<void>();
  

}
