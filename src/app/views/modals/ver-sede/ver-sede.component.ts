
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SedesService } from 'app/services/sedes/sedes.service';

@Component({
  selector: 'app-ver-sede',
  templateUrl: './ver-sede.component.html',
  styleUrls: ['./ver-sede.component.css']
})
export class VerSedeComponent implements OnInit {
   sede:any
  constructor(
    public dialogRef :MatDialogRef<VerSedeComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private sedeService: SedesService
  ) { }

  ngOnInit(): void {
    this.obtenerSede()
  }
  obtenerSede():void{
    this.sedeService.ObtenerSede(this.data.idsede_formacion).subscribe(
      (response) => {
        this.sede = response;
      },
      (error) => {
        console.error('Error al obtener la sede:', error);
      }
    );
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
