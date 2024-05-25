import { Component, OnInit } from '@angular/core';
import { PuestosVigilanciaService } from '../../../services/puestosvigilancia/puestosVig.service';
import { Decimal } from 'decimal.js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-puestos-vigilancia',
  templateUrl: '../crear-puestos-vig/puestosVig.component.html',
  styleUrls: ['./../crear-puestos-vig/puestosVig.component.css']
})
export class PuestosVigilanciaComponent implements OnInit {
  puestos: any[] = [];
  errorMessage: string = '';
  puestoData = {
    descripcion_puesto: '',
    tarifa_puesto: '',
    ays: null,
    iva: null,
    total: null
  };

  constructor(private puestosService: PuestosVigilanciaService) { }

  ngOnInit(): void {
    this.obtenerPuestos();
  }


  

  formatTarifa(event: any) {
    let value = event.target.value;

    // Remover todo excepto números y puntos
    value = value.replace(/[^\d.]/g, '');

    // Reemplazar múltiples puntos por uno solo
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }

    this.puestoData.tarifa_puesto = value;

    // Si el valor es un número válido, realiza el cálculo
    const numberValue = parseFloat(value.replace(/\./g, ''));
    if (!isNaN(numberValue)) {
      this.calcularValores();
    } else {
      this.puestoData.ays = null;
      this.puestoData.iva = null;
      this.puestoData.total = null;
    }
  }

  calcularValores() {
    if (this.puestoData.tarifa_puesto != null && this.puestoData.tarifa_puesto !== '') {
      const tarifa_puesto = new Decimal(this.puestoData.tarifa_puesto.replace(/\./g, ''));
      const ays = tarifa_puesto.times(0.08);
      const iva = tarifa_puesto.plus(ays).times(0.019);
      const total = tarifa_puesto.plus(ays).plus(iva);

      this.puestoData.ays = ays.toNumber();
      this.puestoData.iva = iva.toNumber();
      this.puestoData.total = total.toNumber();
    } else {
      this.puestoData.ays = null;
      this.puestoData.iva = null;
      this.puestoData.total = null;
    }
  }

  onSubmit() {
    this.puestosService.crearPuesto(this.puestoData)
      .subscribe(
        response => {
          console.log('Vigilancia Electrónica creada exitosamente', response);
          this.puestoData = { descripcion_puesto: '', tarifa_puesto: '', ays: null, iva: null, total: null };
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

  obtenerPuestos(): void {
    this.puestosService.obtenerPuestos().subscribe(
      (data) => {
        this.puestos = data.data;
      },
      (error) => {
        this.errorMessage = 'Error al obtener los puestos';
      }
    );
  }

  crearPuesto(puestoData: any): void {
    this.puestosService.crearPuesto(puestoData).subscribe(
      (data) => {
        this.obtenerPuestos();
      },
      (error) => {
        this.errorMessage = 'Error al crear el puesto';
      }
    );
  }

  editarPuesto(id: number, nuevoPuestoData: any): void {
    this.puestosService.editarPuesto(id, nuevoPuestoData).subscribe(
      (data) => {
        this.obtenerPuestos();
      },
      (error) => {
        this.errorMessage = 'Error al editar el puesto';
      }
    );
  }

  eliminarPuesto(id: number): void {
    this.puestosService.eliminarPuesto(id).subscribe(
      (data) => {
        this.obtenerPuestos();
      },
      (error) => {
        this.errorMessage = 'Error al eliminar el puesto';
      }
    );
  }
}
