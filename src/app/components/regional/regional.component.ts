// import { RegionalService } from '../../services/regional/regional.service';
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-regional',
//   templateUrl: './regional.component.html',
//   styleUrls: ['./regional.component.css']
// })
// export class RegionalComponent implements OnInit {
//   regionalForm: FormGroup;
//   errorMessage: string = '';
//   regionales: any[] = [];


//   constructor(private formBuilder: FormBuilder, private regionalService: RegionalService) { }
  
 
//   ngOnInit(): void {
//     this.regionalForm = this.formBuilder.group({
//       nombreRegional: ['', Validators.required],
//       direccion: ['', Validators.required]
//     });
//   }

//   createRegional(): void {
//     if (this.regionalForm.valid) {
//       const nuevaRegional = this.regionalForm.value;
//       this.regionalService.createRegional(nuevaRegional).subscribe(
//         response => {
//           console.log('Regional creada exitosamente:', response);
//           // Aquí podrías agregar lógica adicional, como mostrar un mensaje de éxito o redirigir al usuario a otra página.
//         },
//         error => {
//           console.error('Error al crear la regional:', error);
//           this.errorMessage = 'Error al crear la regional. Por favor, inténtalo de nuevo más tarde.';
//           // Aquí podrías manejar el error de otra manera, como mostrar un mensaje de error al usuario.
//         }
//       );
//     } else {
//       console.log('El formulario no es válido');
//     }
//   }



//   obtenerRegionales(): void {
//     this.regionalService.getAllRegionals().subscribe(
//       (data) => {
//         this.regionales = data;
//       },
//       (error) => {
//         this.errorMessage = 'Error al obtener las regionales';
//       }
//     );
//   }

//   eliminarRegional(id: number): void {
//     this.regionalService.deleteRegionalById(id).subscribe(
//       () => {
//         // Eliminación exitosa, actualiza la lista de regionales
//         this.obtenerRegionales();
//       },
//       (error) => {
//         console.error('Error al eliminar la regional:', error);
//         this.errorMessage = 'Error al eliminar la regional. Por favor, inténtalo de nuevo más tarde.';
//         // Aquí podrías manejar el error de otra manera, como mostrar un mensaje de error al usuario.
//       }
//     );
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegionalService } from '../../services/regional/regional.service';

@Component({
  selector: 'app-regional',
  templateUrl: './regional.component.html',
  styleUrls: ['./regional.component.css']
})
export class RegionalComponent implements OnInit {
  regionalForm: FormGroup;
  errorMessage: string = '';
  regionales: RegionalComponent[] = [];

  constructor(private formBuilder: FormBuilder, private regionalService: RegionalService) { }

  ngOnInit(): void {
    this.regionalForm = this.formBuilder.group({
      nombreRegional: ['', Validators.required],
      direccion: ['', Validators.required]
    });

    this.listarRegionales(); // Llama al método para listar regionales al inicializar el componente
  }

  listarRegionales(): void {
    this.regionalService.getAllRegionals().subscribe(
      data => {
        this.regionales = data;
      },
      error => {
        console.error('Error al obtener las regionales:', error);
        this.errorMessage = 'Error al obtener las regionales. Por favor, inténtalo de nuevo más tarde.';
      }
    );
  }

  createRegional(): void {
    if (this.regionalForm.valid) {
      const nuevaRegional = this.regionalForm.value;
      this.regionalService.createRegional(nuevaRegional).subscribe(
        response => {
          console.log('Regional creada exitosamente:', response);
          // Vuelve a listar las regionales después de crear una nueva
          this.listarRegionales();
          // Limpia el formulario después de crear una nueva regional
          this.regionalForm.reset();
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
