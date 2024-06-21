import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ObligacionesContratistaService } from 'app/services/obligacionContratista/obligaciones-contratista.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-obli-contratista',
  templateUrl: './editar-obli-contratista.component.html',
  styleUrls: ['./editar-obli-contratista.component.css']
})
export class EditarObliContratistaComponent {

  constructor(   public dialogRef: MatDialogRef<EditarObliContratistaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private obligacionService: ObligacionesContratistaService) 
    { }

    onNoClick(): void {
      this.dialogRef.close();
    }
  ngOnInit(): void {
  }
  guardar(): void {
    console.log('Datos antes de guardar:', this.data.obligacion); // Depuración
    const nuevaObligacion = { obligacion_contratista: this.data.obligacion.obligacion_contratista };
    this.obligacionService.EditarObligacionContratista(this.data.obligacion.idobligaciones_contratista, nuevaObligacion).subscribe(
      response => {
        this.dialogRef.close(true);
        console.log('Respuesta del servidor:', response);
        Swal.fire({
          title: "Accion completada!",
          text: "Obligación Editada Correctamente!",
          icon: "success"
        });
      },
      error => {
        alert('Error al actualizar la obligación contractual.');
        console.error('Error en la actualización:', error);
      }
    );
  }

}
