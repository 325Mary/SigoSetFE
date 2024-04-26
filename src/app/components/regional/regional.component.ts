import { RegionalService } from '../../services/regional/regional.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-regional',
  templateUrl: './regional.component.html',
  styleUrls: ['./regional.component.css']
})
export class RegionalComponent implements OnInit {
  regionalForm: FormGroup;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private regionalService: RegionalService) { }

  ngOnInit(): void {
    this.regionalForm = this.formBuilder.group({
      nombreRegional: ['', Validators.required],
      direccion: ['', Validators.required]
    });
  }

  createRegional(): void {
    if (this.regionalForm.valid) {
      const nuevaRegional = this.regionalForm.value;
      this.regionalService.createRegional(nuevaRegional).subscribe(
        response => {
          console.log('Regional creada exitosamente:', response);
          // Aquí podrías agregar lógica adicional, como mostrar un mensaje de éxito o redirigir al usuario a otra página.
        },
        error => {
          console.error('Error al crear la regional:', error);
          this.errorMessage = 'Error al crear la regional. Por favor, inténtalo de nuevo más tarde.';
          // Aquí podrías manejar el error de otra manera, como mostrar un mensaje de error al usuario.
        }
      );
    } else {
      console.log('El formulario no es válido');
    }
  }
}
