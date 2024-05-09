// import { Component, OnInit } from '@angular/core';
// import { PuestosVigilanciaService } from '../../../services/puestosvigilancia/puestosVig.service';

// @Component({
//   selector: 'app-puestos-vigilancia',
//   templateUrl: '../crear-puestos-vig/puestosVig.component.html',
//   styleUrls: ['./../crear-puestos-vig/puestosVig.component.css']
// })
// export class PuestosVigilanciaComponent implements OnInit {
//   puestos: any[] = [];
//   puestoData: any;
//   errorMessage: string = '';

//   constructor(private puestosService: PuestosVigilanciaService) { }

//   ngOnInit(): void {
//     this.obtenerPuestos();
//   }

//   obtenerPuestos(): void {
//     this.puestosService.obtenerPuestos().subscribe(
//       (data) => {
//         this.puestos = data.data;
//       },
//       (error) => {
//         this.errorMessage = 'Error al obtener los puestos';
//       }
//     );
//   }

//   crearPuesto(puestoData: any): void {
//     this.puestosService.crearPuesto(puestoData).subscribe(
//       (data) => {
//         this.obtenerPuestos();
//       },
//       (error) => {
//         this.errorMessage = 'Error al crear el puesto';
//       }
//     );
//   }

//   editarPuesto(id: number, nuevoPuestoData: any): void {
//     this.puestosService.editarPuesto(id, nuevoPuestoData).subscribe(
//       (data) => {
//         this.obtenerPuestos();
//       },
//       (error) => {
//         this.errorMessage = 'Error al editar el puesto';
//       }
//     );
//   }

//   eliminarPuesto(id: number): void {
//     this.puestosService.eliminarPuesto(id).subscribe(
//       (data) => {
//         this.obtenerPuestos();
//       },
//       (error) => {
//         this.errorMessage = 'Error al eliminar el puesto';
//       }
//     );
//   }
// }
import { Component, OnInit } from '@angular/core';
import { PuestosVigilanciaService } from '../../../services/puestosvigilancia/puestosVig.service';

@Component({
  selector: 'app-puestos-vigilancia',
  templateUrl: '../crear-puestos-vig/puestosVig.component.html',
  styleUrls: ['./../crear-puestos-vig/puestosVig.component.css']
})
export class PuestosVigilanciaComponent implements OnInit {
  puestos: any[] = [];
  puestoData: any = { descripcion_puesto: '', tarifa_puesto: 0, ays: 0, iva: 0, total: 0 };
  errorMessage: string = '';

  constructor(private puestosService: PuestosVigilanciaService) { }

  ngOnInit(): void {
    this.obtenerPuestos();
  }

  obtenerPuestos(): void {
    this.puestosService.obtenerPuestos().subscribe(
      (data) => {
        this.puestos = data.data;
      },
      (error) => {
        this.errorMessage = 'Error al obtener los puestos';
      }
    );
  }

  actualizarCalculos(): void {
    
    this.puestoData.iva = this.puestoData.tarifa_puesto * 0.19;
    
    this.puestoData.total = this.puestoData.tarifa_puesto  + this.puestoData.ays + this.puestoData.iva;
  }

  crearPuesto(puestoData: any): void {
    this.actualizarCalculos(); // Actualizar los cálculos antes de crear el puesto
    this.puestosService.crearPuesto(puestoData).subscribe(
      (data) => {
        this.obtenerPuestos();
        this.puestoData = { descripcion_puesto: '', tarifa_puesto: 0, ays: 0, iva: 0, total: 0 };
        this.errorMessage = 'Puesto creado con éxito';
      },
      (error) => {
        this.errorMessage = 'Error al crear el puesto';
      }
    );
  }



  editarPuesto(id: number, nuevoPuestoData: any): void {
    this.actualizarCalculos();
    this.puestosService.editarPuesto(id, nuevoPuestoData).subscribe(
      (data) => {
        this.obtenerPuestos();
      },
      (error) => {
        this.errorMessage = 'Error al editar el puesto';
      }
    );
  }

  eliminarPuesto(id: number): void {
    this.puestosService.eliminarPuesto(id).subscribe(
      (data) => {
        this.obtenerPuestos();
      },
      (error) => {
        this.errorMessage = 'Error al eliminar el puesto';
      }
    );
  }
}
