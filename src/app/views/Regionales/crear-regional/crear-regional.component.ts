import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegionalService } from '../../../services/regional/regional.service';

@Component({
  selector: 'app-crear-regional',
  templateUrl: './crear-regional.component.html',
  styleUrls: ['./crear-regional.component.css']
})
export class CrearRegionalComponent implements OnInit {
  regionalForm: FormGroup;
  errorMessage: string = '';
  regionales: CrearRegionalComponent[]

  constructor(private formBuilder: FormBuilder, private regionalService: RegionalService) { }

  ngOnInit(): void {
    this.regionalForm = this.formBuilder.group({
      id_regional: null,
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
          // Vuelve a listar las regionales después de crear una nueva
        },
        error => {
          console.error('Error al crear la regional:', error);
          this.errorMessage = 'Error al crear la regional. Por favor, inténtalo de nuevo más tarde.';
        }
      );
    } else {
      console.log('El formulario no es válido');
    }
  }

}
