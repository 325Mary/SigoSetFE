
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ObligacionContractualService } from 'app/services/obligacionContractual/obligacion-contractual.service';

@Component({
  selector: 'app-ver-obligacion-modal',
  templateUrl: './ver-obligacion.component.html',
  styleUrls: ['./ver-obligacion.component.css']
})

export class VerObligacionModalComponent implements OnInit {
  obligacion: any;

  constructor(
    public dialogRef: MatDialogRef<VerObligacionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private obligacionContractualService: ObligacionContractualService
  ) {}

  ngOnInit(): void {
    this.obtenerObligacion();
  }

  obtenerObligacion(): void {
    this.obligacionContractualService.obtenerObligacionContractualPorId(this.data.id).subscribe(
      (response) => {
        this.obligacion = response;
      },
      (error) => {
        console.error('Error al obtener la obligación contractual:', error);
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
