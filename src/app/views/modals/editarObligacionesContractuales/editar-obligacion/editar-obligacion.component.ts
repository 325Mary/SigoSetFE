

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
    this.obligacionService.actualizarObligacionContractualPorId(this.data.obligacion.id_obligaciones_contractuales, this.data.obligacion).subscribe(
      response => {
        this.dialogRef.close(true);
      },
      error => {
        alert('Error al actualizar la obligación contractual.');
      }
    );
  }
}
