import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ObligacionesContratoService } from '../../../services/obligacionesContrato/obligaciones-contrato.service';
import { ContratoService } from '../../../services/contrato/contrato.service';
import { ObligacionesContratistaService } from '../../../services/obligacionContratista/obligaciones-contratista.service';
import { ObligacionContractualService } from 'app/services/obligacionContractual/obligacion-contractual.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-crear-obligaciones-contrato',
  templateUrl: './crear-obligaciones-contrato.component.html',
  styleUrls: ['./crear-obligaciones-contrato.component.css']
})
export class CrearObligacionesContratoComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() ObligacionCCreada: EventEmitter<void> = new EventEmitter<void>();

  @Input() mostrarModalCrear: boolean = false;

  contratos: any[] = [];
  obligacionesContratista: any[] = [];
  obligacionesContractuales: any[] = [];

  nuevaObligacionContractual: any = {
    idContrato_empresa: null,
    idobligaciones_contractuales: null
  };

  nuevaObligacionContratista: any = {
    idContrato_empresa: null,
    idobligaciones_contratista: null
  };

  nombreContratoSeleccionadoContractual: string = '';
  nombreObligacionContractual: string = '';

  nombreContratoSeleccionadoContratista: string = '';
  nombreObligacionSeleccionada: string = '';

  constructor(
    private contratoService: ContratoService,
    private obligacionesContratistaService: ObligacionesContratistaService,
    private obligacionesContratoService: ObligacionesContratoService,
    private obligacionService: ObligacionContractualService
  ) {}

  ngOnInit(): void {
    this.obtenerContratos();
    this.obtenerObligacionesContratista();
    this.obtenerObligaciones();
  }

  close(): void {
    this.closeModal.emit();
  }

  obtenerContratos(): void {
    this.contratoService.obtenerContratos().subscribe(
      (response) => {
        this.contratos = response.data[0];
        console.log('contratos', this.contratos);
      },
      (error) => {
        console.error('Error al obtener contratos:', error);
      }
    );
  }

  obtenerObligaciones(): void {
    this.obligacionService.obtenerObligacionesContractuales().subscribe(
      (response) => {
        this.obligacionesContractuales = response;
        console.log('contractuales:', this.obligacionesContractuales);
      },
      (error) => {
        alert('Error al obtener las obligaciones contractuales.' + error);
      }
    );
  }

  obtenerObligacionesContratista(): void {
    this.obligacionesContratistaService.obtenerObligacionesContratista().subscribe(
      (response) => {
        this.obligacionesContratista = response.data[0];
      },
      (error) => {
        console.error('Error al obtener obligaciones del contratista:', error);
      }
    );
  }

  onEmpresaChangeContractual(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const selectedContrato = this.contratos.find(contrato => contrato.nombre_empresa.trim() === inputElement.value.trim());
    if (selectedContrato) {
      this.nuevaObligacionContractual.idContrato_empresa = selectedContrato.idContrato_empresa;
      this.nombreContratoSeleccionadoContractual = selectedContrato.nombre_empresa;
    }
  }

  onObliContrac(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const selectedObligContrac = this.obligacionesContractuales.find(obligacionContractual => obligacionContractual.obligaciones_contractuales.trim() === inputElement.value.trim());
    if (selectedObligContrac) {
      this.nuevaObligacionContractual.idobligaciones_contractuales = selectedObligContrac.idobligaciones_contractuales;
      this.nombreObligacionContractual = selectedObligContrac.obligaciones_contractuales;
    }
  }

  onEmpresaChangeContratista(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const selectedContrato = this.contratos.find(contrato => contrato.nombre_empresa.trim() === inputElement.value.trim());
    if (selectedContrato) {
      this.nuevaObligacionContratista.idContrato_empresa = selectedContrato.idContrato_empresa;
      this.nombreContratoSeleccionadoContratista = selectedContrato.nombre_empresa;
    }
  }

  onObliCoChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const selectedObliCon = this.obligacionesContratista.find(obligacion => obligacion.obligacion_contratista.trim() === inputElement.value.trim());
    if (selectedObliCon) {
      this.nuevaObligacionContratista.idobligaciones_contratista = selectedObliCon.idobligaciones_contratista;
      this.nombreObligacionSeleccionada = selectedObliCon.obligacion_contratista;
    }
  }

  onSubmitContractual(form: NgForm): void {
    if (form.valid) {
      this.obligacionesContratoService.crearObligacionContrato(this.nuevaObligacionContractual).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Creación exitosa',
            text: 'La obligación contractual ha sido creada correctamente.',
          }).then(() => {
            this.ObligacionCCreada.emit();
            this.close();
            form.resetForm();
            this.nombreContratoSeleccionadoContractual = '';
            this.nombreObligacionContractual = '';
          });
        },
        (error) => {
          console.error('Error al crear la obligación contractual:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al crear la obligación contractual. Ya se encuentra registrada',
          });
        }
      );
    }
  }

  onSubmitContratista(form: NgForm): void {
    if (form.valid) {
      this.obligacionesContratoService.crearObligacionContrato(this.nuevaObligacionContratista).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Creación exitosa',
            text: 'La obligación del contratista ha sido creada correctamente.',
          }).then(() => {
            this.ObligacionCCreada.emit();
            this.close();
            form.resetForm();
            this.nombreContratoSeleccionadoContratista = '';
            this.nombreObligacionSeleccionada = '';
          });
        },
        (error) => {
          console.error('Error al crear la obligación del contratista:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al crear la obligación del contratista. Ya se encuentra registrada',
          });
        }
      );
    }
  }
}
