import { Component } from '@angular/core';
import { VigilanciaElectronicaService } from "../../../services/PuestosElectronicos/vigilancia-electronica.service";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-ve',
  templateUrl: './crear-ve.component.html',
  styleUrls: ['./crear-ve.component.css']
})
export class CrearVEComponent {
  vigilanciaElectronica = {
    descripcion: '',
    tarifa: '',
    ays: '',
    total: null
  };
  errorMessage: string | null = null;

  constructor(private vigilanciaElectronicaService: VigilanciaElectronicaService,
    private router: Router
  ) {}

  calcularTotal() {
    if (this.vigilanciaElectronica.tarifa && this.vigilanciaElectronica.ays) {
      const tarifa = parseFloat(this.vigilanciaElectronica.tarifa);
      const ays = parseFloat(this.vigilanciaElectronica.ays);
      this.vigilanciaElectronica.total = (tarifa + ays) / 2;
    } else {
      this.vigilanciaElectronica.total = null;
    }
  }


  onSubmit() {
    this.vigilanciaElectronicaService.crearVigilaciaElectronica(this.vigilanciaElectronica)
      .subscribe(
        response => {
          console.log('Vigilancia Electrónica creada exitosamente', response);
          this.vigilanciaElectronica = { descripcion: '', tarifa: '', ays: '', total: null };
          this.errorMessage = null;
          // Mostrar alerta de éxito
          Swal.fire('¡Éxito!', 'Vigilancia Electrónica creada exitosamente', 'success');
          this.router.navigate(['/listarVigilanciaElectronica']);
        },
        error => {
          console.error('Error creando vigilancia electrónica', error);
          this.errorMessage = 'Error creando vigilancia electrónica. Por favor, intenta nuevamente.';
          // Mostrar alerta de error
          Swal.fire('¡Error!', 'Error creando vigilancia electrónica. Por favor, intenta nuevamente.', 'error');
        }
      );
  }
}
