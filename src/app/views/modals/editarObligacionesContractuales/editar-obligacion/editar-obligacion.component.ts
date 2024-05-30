

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ObligacionContractualService } from 'app/services/obligacionContractual/obligacion-contractual.service';  


@Component({
  selector: 'app-editar-obligacion-modal',
  templateUrl: './editar-obligacion.component.html',
  styleUrls: ['./editar-obligacion.component.css']
})
export class EditarObligacionModalComponent {
  constructor(
    public dialogRef: MatDialogRef<EditarObligacionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private obligacionService: ObligacionContractualService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    console.log('Datos antes de guardar:', this.data.obligacion); // Depuración
    const nuevaObligacion = { obligaciones_contractuales: this.data.obligacion.obligaciones_contractuales };
    this.obligacionService.actualizarObligacionContractualPorId(this.data.obligacion.idobligaciones_contractuales, nuevaObligacion).subscribe(
      response => {
        this.dialogRef.close(true);
        console.log('Respuesta del servidor:', response);
      },
      error => {
        alert('Error al actualizar la obligación contractual.');
        console.error('Error en la actualización:', error);
      }
    );
  }
}
