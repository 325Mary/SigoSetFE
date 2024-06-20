// import { Component, OnInit } from '@angular/core';
// import { SedesService } from 'app/services/sedes/sedes.service';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-listar-sedes',
//   templateUrl: './listar-sedes.component.html',
//   styleUrls: ['./listar-sedes.component.css']
// })
// export class ListarSedesComponent implements OnInit {
//   sedes: any[] = [];
//   currentPage: number = 1;
//   pageSize: number = 10;
//   terminoBusqueda: string = ''; // Propiedad para almacenar el término de búsqueda

//   constructor(private sedesService: SedesService) { }

//   ngOnInit(): void {
//     this.obtenerSedes();
//   }

//   obtenerSedes(): void {
//     this.sedesService.obtenerSedes().subscribe(
//       (data: any) => {
//         this.sedes = data.data;
//       },
//       (error) => {
//         console.error('Error al obtener las sedes:', error);
//       }
//     );
//   }

//   filtrarSedes(){

//   }
//   eliminarSede(idSede: number): void {
//     Swal.fire({
//       title: '¿Estás seguro?',
//       text: 'Esta acción no se puede revertir',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Sí, eliminar',
//       cancelButtonText: 'Cancelar'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         // Llamar al servicio para eliminar la sede
//         this.sedesService.eliminarSede(idSede).subscribe(
//           (data) => {
//             this.obtenerSedes(); // Volver a cargar la lista de sedes después de eliminar
//             Swal.fire(
//               'Eliminado!',
//               'La sede ha sido eliminada correctamente.',
//               'success'
//             );
//           },
//           (error) => {
//             console.error('Error al eliminar la sede:', error);
//             Swal.fire(
//               'Error!',
//               'Ha ocurrido un error al eliminar la sede.',
//               'error'
//             );
//           }
//         );
//       }
//     });
//   }

//   // Otras acciones como editar y ver detalles podrían ir aquí
// }
