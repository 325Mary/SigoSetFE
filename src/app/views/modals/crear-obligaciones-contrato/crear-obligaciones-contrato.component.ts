import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ObligacionesContratoService } from '../../../services/obligacionesContrato/obligaciones-contrato.service';
import { ContratoService } from '../../../services/contrato/contrato.service';
import { ObligacionesContratistaService } from '../../../services/obligacionContratista/obligaciones-contratista.service';
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
  nuevaObligacion: any = {
    idContrato_empresa: null,
    idobligaciones_contratista: null
  };
  
  // Variables auxiliares para mostrar los nombres seleccionados
  nombreContratoSeleccionado: string = '';
  nombreObligacionSeleccionada: string = '';

  constructor(
    private contratoService: ContratoService,
    private obligacionesContratistaService: ObligacionesContratistaService,
    private obligacionesContratoService: ObligacionesContratoService
  ) {}

  ngOnInit(): void {
    this.obtenerContratos();
    this.obtenerObligacionesContratista();
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

  onEmpresaChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const selectedContrato = this.contratos.find(contrato => contrato.nombre_empresa === inputElement.value);
    if (selectedContrato) {
      this.nuevaObligacion.idContrato_empresa = selectedContrato.idContrato_empresa;
      this.nombreContratoSeleccionado = selectedContrato.nombre_empresa; // Mostrar nombre seleccionado
    }
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

  onObliCoChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const selectedObliCon = this.obligacionesContratista.find(obligacion => obligacion.obligacion_contratista === inputElement.value);
    if (selectedObliCon) {
      this.nuevaObligacion.idobligaciones_contratista = selectedObliCon.idobligaciones_contratista;
      this.nombreObligacionSeleccionada = selectedObliCon.obligacion_contratista; // Mostrar nombre seleccionado
    }
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.obligacionesContratoService.crearObligacionContrato(this.nuevaObligacion).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Creación exitosa',
            text: 'La obligación ha sido creada correctamente.',
          }).then(() => {
            this.ObligacionCCreada.emit();
            this.close();
            form.resetForm();
            // Resetear las variables auxiliares después de guardar
            this.nombreContratoSeleccionado = '';
            this.nombreObligacionSeleccionada = '';
          });
        },
        (error) => {
          console.error('Error al crear la obligación:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al crear la obligación. Ya se encuentra registrada',
          });
        }
      );
    }
  }
}
