import { Component, Input, Output, EventEmitter, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MunicipioService } from 'app/services/Municipio/municipio.service';

@Component({
  selector: 'app-ver-municipio',
  templateUrl: './ver-municipios.component.html',
  styleUrls: ['./ver-municipios.component.css']
})
export class VerMunicipioComponent implements OnInit {
  @Input() municipio: any; 
  @Output() closeModal = new EventEmitter<void>();

  constructor(
    private municipioService: MunicipioService,
    public dialogRef: MatDialogRef<VerMunicipioComponent>,
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

  close(): void {
    this.closeModal.emit();
  }
}
