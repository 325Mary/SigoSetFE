import { Component } from '@angular/core';
import { VigilanciaElectronicaService } from "../../../services/PuestosElectronicos/vigilancia-electronica.service";
import { Decimal } from 'decimal.js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-ve',
  templateUrl: './crear-ve.component.html',
  styleUrls: ['./crear-ve.component.css']
})
export class CrearVEComponent {
  vigilanciaElectronica = {
    descripcion: '',
    tarifa: '',
    ays: null,
    iva: null,
    total: null
  };
  errorMessage: string | null = null;

  constructor(private vigilanciaElectronicaService: VigilanciaElectronicaService) {}

  formatTarifa(event: any) {
    let value = event.target.value;

    // Remover todo excepto números y puntos
    value = value.replace(/[^\d.]/g, '');

    // Reemplazar múltiples puntos por uno solo
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }

    this.vigilanciaElectronica.tarifa = value;

    // Si el valor es un número válido, realiza el cálculo
    const numberValue = parseFloat(value.replace(/\./g, ''));
    if (!isNaN(numberValue)) {
      this.calcularValores();
    } else {
      this.vigilanciaElectronica.ays = null;
      this.vigilanciaElectronica.iva = null;
      this.vigilanciaElectronica.total = null;
    }
  }

  calcularValores() {
    if (this.vigilanciaElectronica.tarifa != null && this.vigilanciaElectronica.tarifa !== '') {
      const tarifa = new Decimal(this.vigilanciaElectronica.tarifa.replace(/\./g, ''));
      const ays = tarifa.times(0.08);
      const iva = tarifa.plus(ays).times(0.019);
      const total = tarifa.plus(ays).plus(iva);

      this.vigilanciaElectronica.ays = ays.toNumber();
      this.vigilanciaElectronica.iva = iva.toNumber();
      this.vigilanciaElectronica.total = total.toNumber();
    } else {
      this.vigilanciaElectronica.ays = null;
      this.vigilanciaElectronica.iva = null;
      this.vigilanciaElectronica.total = null;
    }
  }

  onSubmit() {
    this.vigilanciaElectronicaService.crearVigilaciaElectronica(this.vigilanciaElectronica)
      .subscribe(
        response => {
          console.log('Vigilancia Electrónica creada exitosamente', response);
          this.vigilanciaElectronica = { descripcion: '', tarifa: '', ays: null, iva: null, total: null };
          this.errorMessage = null;
          // Mostrar alerta de éxito
          Swal.fire('¡Éxito!', 'Vigilancia Electrónica creada exitosamente', 'success');
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
