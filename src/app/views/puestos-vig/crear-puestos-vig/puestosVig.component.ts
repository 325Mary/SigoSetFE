
import { Component, OnInit } from '@angular/core';
import { PuestosVigilanciaService } from '../../../services/puestosvigilancia/puestosVig.service';
import { CrearContratoComponent } from 'app/views/modals/crear-contrato/crear-contrato.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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

  constructor(private router:Router, private puestosService: PuestosVigilanciaService) { }


  ngOnInit(): void {
    this.obtenerPuestos();
  }

  crearPuesto() {
    this.actualizarCalculos(); // Actualizar los cálculos antes de crear el puesto
    this.puestosService.crearPuesto(this.nuevopuesto).subscribe(
      (response) => {
        console.log('Puesto Creado');
        this.nuevopuesto={}
        Swal.fire({
          title: '! Hecho ¡',
          text: 'Puesto creado con éxito',
          icon: 'success',
          timer: 3000
        }).then((response) => {
          if (response.isConfirmed) {
            this.router.navigate(['listarPuestosVig']);
          }
        });
        this.errorMessage = 'Puesto creado con éxito';
        console.log('Puesto creado');
      },
      (error) => {
        this.errorMessage = 'Error al crear el puesto';
        Swal.fire({
          title: '! Error ¡',
          text: 'No se pudo crear el Puesto',
          icon: 'warning',
          timer: 3000
        });
        console.error('Error al crear el puesto:', error); // Log error for debugging
      }
    );
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
        this.nuevopuesto = data.data;
        console.log(data)
      },
      (error) => {   
        this.errorMessage = 'Error al obtener los puestos';
      }
    );
  }

  actualizarCalculos(): void {
    this.nuevopuesto.ays = this.nuevopuesto.tarifa_puesto *0.08;
    
    this.nuevopuesto.iva = (this.nuevopuesto.tarifa_puesto + this.nuevopuesto.ays)* 0.19;
    
    this.nuevopuesto.total = this.nuevopuesto.tarifa_puesto  + this.nuevopuesto.ays + this.nuevopuesto.iva;
  }

 




  editarPuesto(id: number, nuevoPuestoData: any): void {
    this.actualizarCalculos();
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
