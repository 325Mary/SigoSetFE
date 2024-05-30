
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

  editarMunicipio(): void {
    if (this.municipioSeleccionado) {
      const nuevoMunicipioData = {
        municipio: this.municipioSeleccionado.municipio,
        iddepartamento: this.municipioSeleccionado.iddepartamento
      };

      this.municipioService.editarMunicipio(this.municipioSeleccionado.idmunicipio, nuevoMunicipioData).subscribe(
        (response) => {
          console.log('Municipio actualizado:', response);
          this.dialogRef.close('Municipio actualizado');
          Swal.fire({
            icon: 'success',
            title: 'Municipio actualizado',
            text: 'El Municipio ha sido actualizado exitosamente'
          });
        },
        (error) => {
          console.error('Error al actualizar el Municipio:', error);
          let errorMessage = 'Ocurrió un error al intentar actualizar el Municipio. Por favor, inténtalo de nuevo.';
          if (error && error.error && error.error.message) {
            errorMessage = error.error.message;
          }
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errorMessage
          });
        }
      );
    } else {
      console.error('municipioSeleccionado is undefined');
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}


