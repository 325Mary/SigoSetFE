
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ver-obligacion-modal',
  templateUrl: './ver-obligacion.component.html',
  styleUrls: ['./ver-obligacion.component.css']
})
export class VerObligacionModalComponent {
  constructor(
    public dialogRef: MatDialogRef<VerObligacionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}