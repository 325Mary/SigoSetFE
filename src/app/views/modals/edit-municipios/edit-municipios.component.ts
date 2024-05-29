import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MunicipioService } from 'app/services/Municipio/municipio.service';

@Component({
  selector: 'app-edit-municipio',
  templateUrl: './edit-municipios.component.html',
  styleUrls: ['./edit-municipios.component.css']
})
export class EditMunicipioComponent implements OnInit {
  municipio: any = {};

  constructor(
    private municipioService: MunicipioService,
    public dialogRef: MatDialogRef<EditMunicipioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idmunicipio: number }
  ) {}

  ngOnInit(): void {
    this.municipioService.obtenerMunicipioPorId(this.data.idmunicipio).subscribe(
      (response) => {
        this.municipio = response.data;
      },
      (error) => {
        console.error('Error al obtener municipio', error);
      }
    );
  }

  editarMunicipio(): void {
    this.municipioService.editarMunicipio(this.data.idmunicipio, this.municipio).subscribe(
      () => {
        this.dialogRef.close('Municipio actualizado');
      },
      (error) => {
        console.error('Error al actualizar municipio', error);
      }
    );
  }
  close(): void {
    this.dialogRef.close(); 
  }
}
