import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { ZonaService } from 'app/services/zona/zona.service';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-editar-zona',
  templateUrl: './editar-zona.component.html',
  styleUrls: ['./editar-zona.component.css']
})
export class EditarZonaComponent {
  constructor(
    public dialogRef: MatDialogRef<EditarZonaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private zonaService: ZonaService
  ) { }

  ngOnInit(): void { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  guardar(): void {
    console.log('Datos antes de guardar:', this.data.zona); // Depuración
    const nuevaSede = {
      Nombre_zona: this.data.zona.Nombre_zona,

    };
    this.zonaService.editarZona(this.data.zona.idzona, nuevaSede).subscribe(
      response => {
        this.dialogRef.close(true);
        console.log('Respuesta del servidor:', response);
        Swal.fire({
          title: "Accion completada!",
          text: "Zona Editada Correctamente!",
          icon: "success"
        });

      },
      error => {
        alert('Error al actualizar la Zona.');
        console.error('Error en la actualización:', error);
      }
    );
  }





}
