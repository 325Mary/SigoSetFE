
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ObligacionesContratistaService } from 'app/services/obligacionContratista/obligaciones-contratista.service'; 


@Component({
  selector: 'app-ver-obli-contratista',
  templateUrl: './ver-obli-contratista.component.html',
  styleUrls: ['./ver-obli-contratista.component.css']
})
export class VerObliContratistaComponent implements OnInit {

  obligacion: any;
  constructor(
    public dialogRef: MatDialogRef<VerObliContratistaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private obligacionContratistaService: ObligacionesContratistaService
  ) { }

  ngOnInit(): void {
    this.obtenerObligacion();
  }
  obtenerObligacion(): void {
    this.obligacionContratistaService.obtenerObligacionContratistaC(this.data.idobligaciones_contratista).subscribe(
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
