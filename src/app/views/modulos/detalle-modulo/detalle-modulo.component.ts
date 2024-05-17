import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detalle-modulo',
  templateUrl: './detalle-modulo.component.html',
  styleUrls: ['./detalle-modulo.component.css'],
})
export class DetalleModuloComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    // You can now use 'data' here
    console.log(this.data);
  }
}
