import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SedesService } from 'app/services/sedes/sedes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-sede',
  templateUrl: './editar-sede.component.html',
  styleUrls: ['./editar-sede.component.css']
})
export class EditarSedeComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditarSedeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sedeService: SedesService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    // Aquí puedes agregar cualquier inicialización necesaria
  }

  guardar(): void {
    console.log('Datos antes de guardar:', this.data.sede); // Depuración
    const nuevaSede = {
      sede_formacion: this.data.sede.sede_formacion,
      dir_sede_formacion: this.data.sede.dir_sede_formacion,
      telefono_sedef: this.data.sede.telefono_sedef,
      email_sedef: this.data.sede.email_sedef
    };
    this.sedeService.editarSede(this.data.sede.idsede_formacion, nuevaSede).subscribe(
      response => {
        this.dialogRef.close(true);
        console.log('Respuesta del servidor:', response);
        Swal.fire({
          title: "Accion completada!",
          text: "Sede Editada Correctamente!",
          icon: "success"
        });

      },
      error => {
        alert('Error al actualizar la sede.');
        console.error('Error en la actualización:', error);
      }
    );
  }

}
