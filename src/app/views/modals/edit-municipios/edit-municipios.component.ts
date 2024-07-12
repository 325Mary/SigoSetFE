
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MunicipioService } from 'app/services/Municipio/municipio.service';

@Component({
  selector: 'app-edit-municipios',
  templateUrl: './edit-municipios.component.html',
  styleUrls: ['./edit-municipios.component.css']
})
export class EditMunicipioComponent implements OnInit {
  municipioSeleccionado: any;

  constructor(
    private municipioService: MunicipioService,
    private dialogRef: MatDialogRef<EditMunicipioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.municipioSeleccionado = this.data.municipio;
    console.log('Datos del municipio a editar:', this.municipioSeleccionado);
  }



  close(): void {
    this.dialogRef.close();
  }
}


