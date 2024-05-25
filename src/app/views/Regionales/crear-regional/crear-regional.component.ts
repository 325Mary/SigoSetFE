import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegionalService } from '../../../services/regional/regional.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-regional',
  templateUrl: './crear-regional.component.html',
  styleUrls: ['./crear-regional.component.css']
})
export class CrearRegionalComponent implements OnInit {
  regionalForm: FormGroup;
  errorMessage: string = '';
  regionales: CrearRegionalComponent[];

  constructor(private formBuilder: FormBuilder, private regionalService: RegionalService,private router: Router) { }

  ngOnInit(): void {
    this.regionalForm = this.formBuilder.group({
      id_regional: null,
      regional: ['', Validators.required],
      direccion: ['', Validators.required]
    });
  }

  createRegional(): void {
    if (this.regionalForm.valid) {
      const nuevaRegional = this.regionalForm.value;
      this.regionalService.createRegional(nuevaRegional).subscribe(
        response => {
          Swal.fire('Éxito', 'Regional creada exitosamente', 'success');
          console.log('Regional creada exitosamente:', response);
        },
        error => {
          Swal.fire('Error', 'Error al crear la regional. Por favor, inténtalo de nuevo más tarde.', 'error');
          console.error('Error al crear la regional:', error);
        }
      );
    } else {
      Swal.fire('Error', 'Por favor completa todos los campos', 'error');
      console.log('El formulario no es válido');
    }
  }
}
