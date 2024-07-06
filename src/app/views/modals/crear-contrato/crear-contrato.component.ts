import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {ContratoService} from '../../../services/contrato/contrato.service'
import {EmpresaService} from '../../../services/empresas/empresa.service'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-contrato',
  templateUrl: './crear-contrato.component.html',
  styleUrls: ['./crear-contrato.component.css']
})
export class CrearContratoComponent {

  @Output() contratoCreado: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  nuevoContrato: any = {};
  empresas: any;
  selectedFile: File | null = null; 

  constructor(private contratoService: ContratoService, private router: Router, private empresaService: EmpresaService ) { }

  ngOnInit(): void {
    this.cargarEmpresas()
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];  
  }

  crearContrato(): void {
    const formData = new FormData();
    formData.append('idempresa', this.nuevoContrato.idempresa);
    formData.append('descripcion_contrato', this.nuevoContrato.descripcion_contrato);
    formData.append('fecha_inicio', this.nuevoContrato.fecha_inicio);
    formData.append('fecha_fin', this.nuevoContrato.fecha_fin);
    if (this.selectedFile) {
      formData.append('contrato_pdf', this.selectedFile, this.selectedFile.name);  
    }

    this.contratoService.crearContrato(formData).subscribe(
      (response) => {
        console.log('Contrato creado exitosamente:', response.data);
        this.nuevoContrato = {};
        this.contratoCreado.emit();
        this.closeModal.emit();

        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Contrato creado exitosamente'
        }).then((result) => {
          this.router.navigate(['/listContratos']);
        });
      },
      (error) => {
        console.error('Error al crear contrato:', error);
        let errorMessage = 'Ocurrió un error al crear el contrato. Por favor, inténtalo de nuevo más tarde.';
        if (error && error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: errorMessage
        });
      }
    );
  }

  
  

seleccionarEmpresa(event: any) {
  const selectedEmpresa = this.empresas.find((empresa: any) => empresa.nombre_empresa === event.target.value);
  if (selectedEmpresa) {
      this.nuevoContrato.idempresa = selectedEmpresa.idempresa;
  }
}

cargarEmpresas() {
  this.empresaService.obtenerEmpresas().subscribe(
    (response) => {
      // Asigna la lista de empresas a una propiedad del componente para utilizarla en el HTML
      this.empresas = response.data[0];
      console.log('empre:', this.empresas)
    },
    (error) => {
      console.error('Error al obtener empresas:', error);
      // Manejar el error según sea necesario
    }
  )
}
close(): void {
  this.closeModal.emit();
}
camposCompletos(): boolean {
  return !!(
      this.nuevoContrato.nombre_empresa &&
      this.nuevoContrato.fecha_inicio &&
      this.nuevoContrato.fecha_fin &&
      this.selectedFile 
  );
}

}
