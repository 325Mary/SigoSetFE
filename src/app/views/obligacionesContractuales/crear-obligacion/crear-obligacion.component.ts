
import { Component } from '@angular/core';
import { ObligacionContractualService } from '../../../services/obligacionContractual/obligacion-contractual.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-obligacion',
  templateUrl: './crear-obligacion.component.html',
  styleUrls: ['./crear-obligacion.component.css']
})
export class CrearObligacionComponent {
  nuevaObligacion = {
    obligacion_contractual: ''
  };

  constructor(private obligacionService: ObligacionContractualService, private router: Router) {}

  crearObligacion(): void {
    this.obligacionService.crearObligacionContractual(this.nuevaObligacion).subscribe(
      response => {
        alert('Obligación contractual creada exitosamente.');
        this.router.navigate(['/administrar-obligacion']);
      },
      error => {
        alert('Error en la creación de la obligación contractual.');
      }
    );
  }
}
