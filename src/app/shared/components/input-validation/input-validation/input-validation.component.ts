import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent implements OnInit {

  @Input() control: FormControl;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() minLength: number;
  @Input() maxLength: number;
  @Input() type: string;

  constructor() { }

  ngOnInit(): void {
    // Aplicar validadores según los parámetros recibidos
    if (this.minLength) {
      this.control.setValidators([Validators.minLength(this.minLength)]);
    }
    if (this.maxLength) {
      this.control.setValidators([Validators.maxLength(this.maxLength)]);
    }
    if (this.type === 'email') {
      this.control.setValidators([Validators.email]);
    }
    // Agregar validación de campo obligatorio
    this.control.setValidators([Validators.required]);
    // Marcar el control como 'touched' para que las validaciones se apliquen desde el inicio
    this.control.markAsTouched();
  }

  // Método para mostrar los mensajes de error
  getErrorMessage(): string {
    if (this.control.hasError('required')) {
      return 'Este campo es obligatorio';
    } else if (this.control.hasError('email')) {
      return 'Debe ser un correo electrónico válido';
    } else if (this.control.hasError('minlength')) {
      return `Debe tener al menos ${this.minLength} caracteres`;
    } else if (this.control.hasError('maxlength')) {
      return `Debe tener como máximo ${this.maxLength} caracteres`;
    }
    return '';
  }
}
