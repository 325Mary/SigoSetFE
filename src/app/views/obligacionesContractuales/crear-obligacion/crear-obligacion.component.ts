
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
    obligaciones_contractuales: ''
  };

  constructor(private obligacionService: ObligacionContractualService, private router: Router) {}

  crearObligacion(): void {
    this.obligacionService.crearObligacionContractual(this.nuevaObligacion).subscribe(
      response => {
        alert('Obligación contractual creada exitosamente.');
        this.router.navigate(['/administrar-obligacion']);
        console.log(response);
        
      },
      error => {
        alert('Error en la creación de la obligación contractual.');
        console.log(error);
        
      }
    );
  }
}
