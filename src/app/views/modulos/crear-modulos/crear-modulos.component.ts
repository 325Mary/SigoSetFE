// import { Component, OnInit } from '@angular/core';
// import { ModuloService } from '../../../services/modulos/modulos.service';

// @Component({
//   selector: 'app-crear-modulos',
//   templateUrl: './crear-modulos.component.html',
//   styleUrls: ['./crear-modulos.component.css']
// })
// export class CrearModulosComponent implements OnInit {

//     modulo: {
//       idmodulo: 0,
//       id_modulo_padre: 0,
//       modulo: '',
//       url_modulo: '',
//       icono: '',
//       orden: 0,
//       hijos: null
//     };
//     errorMessage: string = '';


//   constructor(private moduloService: ModuloService) { }

//   ngOnInit(): void {
//   }




//   crearModulo(): void {
//     this.moduloService.crearModulo(this.modulo).subscribe(
//       (data) => {
//         // Manejar la respuesta exitosa, por ejemplo, redirigir a la página de listado de módulos
//       },
//       (error) => {
//         this.errorMessage = error; // Mostrar el mensaje de error en la plantilla HTML
//       }
//     );
//   }
// }
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModuloService } from '../../../services/modulos/modulos.service';


@Component({
  selector: 'app-crear-modulos',
  templateUrl: './crear-modulos.component.html',
  styleUrls: ['./crear-modulos.component.css']
})
export class CrearModulosComponent {
  moduloForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private moduloService: ModuloService) {
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

  crearModulo(): void {
    if (this.moduloForm.valid) {
      this.moduloService.crearModulo(this.moduloForm.value).subscribe(
        () => {
          this.moduloForm.reset();
          this.errorMessage = '';
          alert('Módulo creado exitosamente');
        },
        (error) => {
          this.errorMessage = error;
        }
      );
    } else {
      alert('Por favor, completa todos los campos');
    }
  }
}

