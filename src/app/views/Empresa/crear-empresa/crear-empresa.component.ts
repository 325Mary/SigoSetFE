import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../../services/empresas/empresa.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-empresa',
  templateUrl: './crear-empresa.component.html',
  styleUrls: ['./crear-empresa.component.css']
})
export class CrearEmpresaComponent implements OnInit {
  nuevaEmpresa: any = {
    nombre_empresa: '',
    nit_empresa: '',
    direccion_empresa: '',
    telefono_empresa: '',
    email_empresa: '',
    persona_contacto: '',
    telefono_personac: '',
    email_personac: '',
    representante_legal: '',
    telefono_representantel: '',
    email_representantel: ''
  };
  mostrarMensaje: boolean = false;
  errores: any = {
    telefono_empresa: false,
    nit: false,
    telefono_personac: false,
    telefono_representantel: false
  };

  constructor(private empresaService: EmpresaService, private router: Router) { }

  ngOnInit(): void { }

  crearEmpresa() {
    if (this.camposCompletos()) {
      this.empresaService.crearEmpresa(this.nuevaEmpresa).subscribe(
        (response) => {
          console.log('Empresa creada exitosamente:', response.data);
          this.nuevaEmpresa = {}; // Limpiar datos de la nueva empresa

          // Mostrar Sweet Alert de éxito
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Empresa creada exitosamente'
          }).then((result) => {
            // Navegar a la ruta deseada después de cerrar el Sweet Alert
            this.router.navigate(['/ListEmpresas']);
          });
        },
        (error) => {
          console.error('Error al crear empresa:', error);

          // Obtener el mensaje de error del objeto error
          let errorMessage = 'Ocurrió un error al crear la empresa. Por favor, inténtalo de nuevo más tarde.';
          if (error && error.error && error.error.message) {
            errorMessage = error.error.message;
          }

          // Mostrar Sweet Alert de error con el mensaje específico
          Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: errorMessage
          });
        }
      );
    }
  }

  // Validaciones
  verificarEmail(campo: string) {
    if (campo === 'email_empresa') {
      this.errores.email_empresa = !this.validarEmail(this.nuevaEmpresa.email_empresa);
    } else if (campo === 'email_personac') {
      this.errores.email_personac = !this.validarEmail(this.nuevaEmpresa.email_personac);
    } else if (campo === 'email_representantel') {
      this.errores.email_representantel = !this.validarEmail(this.nuevaEmpresa.email_representantel);
    }
  }

  validarEmail(email: string): boolean {
    return email.includes('@');
  }

  onInput(event: any, campo: string) {
    const input = event.target.value;
    const campos = ['telefono_empresa', 'nit', 'telefono_personac', 'telefono_representantel'];

    if (campos.includes(campo)) {
      if (input.length > 10) {
          this.errores[campo] = 'El número no puede exceder los 10 caracteres';
          this.nuevaEmpresa[campo] = input.slice(0, 10);
      } else if (input.length < 10) {
          this.errores[campo] = 'El número no debe tener menos 10 caracteres';
      } else {
          this.errores[campo] = null;
      }
  }
  
  
}

camposCompletos(): boolean {
  const emailEmpresaV = this.validarEmail(this.nuevaEmpresa.email_empresa);
  const emailPersona = this.validarEmail(this.nuevaEmpresa.email_personac);
  const emailRepresentante = this.validarEmail(this.nuevaEmpresa.email_representantel);
  return (
    this.nuevaEmpresa.nombre_empresa &&
    this.nuevaEmpresa.nit_empresa &&
    this.nuevaEmpresa.direccion_empresa &&
    this.nuevaEmpresa.telefono_empresa &&
    emailEmpresaV &&
    this.nuevaEmpresa.persona_contacto &&
    this.nuevaEmpresa.telefono_personac &&
    emailPersona &&
    this.nuevaEmpresa.representante_legal &&
    this.nuevaEmpresa.telefono_representantel &&
    emailRepresentante
  );
}
}
