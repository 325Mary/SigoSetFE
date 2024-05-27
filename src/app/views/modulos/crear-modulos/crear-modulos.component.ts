
// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ModuloService } from '../../../services/modulos/modulos.service';


// @Component({
//   selector: 'app-crear-modulos',
//   templateUrl: './crear-modulos.component.html',
//   styleUrls: ['./crear-modulos.component.css']
// })
// export class CrearModulosComponent {
//   moduloForm: FormGroup;
//   errorMessage: string = '';

//   constructor(private fb: FormBuilder, private moduloService: ModuloService) {
//     this.moduloForm = this.fb.group({
//       idmodulo: [null],
//       id_modulo_padre: [null],
//       modulo: ['', Validators.required],
//       url_modulo: ['', Validators.required],
//       icono: ['', Validators.required],
//       orden: ['', Validators.required],
//       hijos: [null]
//     });
//   }

//   crearModulo(): void {
//     if (this.moduloForm.valid) {
//       this.moduloService.crearModulo(this.moduloForm.value).subscribe(
//         () => {
//           this.moduloForm.reset();
//           this.errorMessage = '';
//           alert('Módulo creado exitosamente');
//         },
//         (error) => {
//           this.errorMessage = error;
//         }
//       );
//     } else {
//       alert('Por favor, completa todos los campos');
//     }
//   }
// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModuloService } from '../../../services/modulos/modulos.service';


@Component({
  selector: 'app-crear-modulos',
  templateUrl: './crear-modulos.component.html',
  styleUrls: ['./crear-modulos.component.css']
})
export class CrearModulosComponent {
  moduloForm: FormGroup;
  errorMessage: string  | null = null;

  constructor(private fb: FormBuilder, private moduloService: ModuloService, private snackBar: MatSnackBar) {
    this.moduloForm = this.fb.group({
      idmodulo: [null],
      id_modulo_padre: [null],
      modulo: ['', Validators.required],
      url_modulo: ['', Validators.required],
      icono: ['', Validators.required],
      orden: ['', Validators.required],
      hijos: [null]
    });
  }

  ngOnInit():void {}
  crearModulo() {
    if (this.moduloForm.invalid) {
      this.errorMessage = "Todos los campos son obligatorios";
      return;
    }

    this.moduloService.crearModulo(this.moduloForm.value).subscribe(
      response => {
        this.snackBar.open('Módulo creado exitosamente', 'Cerrar', {
          duration: 3000
        });
        this.moduloForm.reset();
        this.errorMessage = null;
      },
      error => {
        this.errorMessage = 'Error al crear el módulo';
      }
    );
  }
}