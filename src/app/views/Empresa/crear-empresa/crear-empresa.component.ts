import { Component, OnInit } from '@angular/core';
import {  EmpresaService} from  '../../../services/empresas/empresa.service'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-crear-empresa',
  templateUrl: './crear-empresa.component.html',
  styleUrls: ['./crear-empresa.component.css']
})
export class CrearEmpresaComponent {

  nuevaEmpresa: any = {};
  
  constructor(private empresaService: EmpresaService, private router: Router ) { }

  ngOnInit(): void {
  }
  crearEmpresa() {
    this.empresaService.crearEmpresa(this.nuevaEmpresa).subscribe(
      (response) => {
        console.log('Perfil creado exitosamente:', response.data);
        this.nuevaEmpresa = {}; // Limpiar datos del nuevo perfil
  
        // Mostrar Sweet Alert de éxito
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Empresa creado exitosamente'
        }).then((result) => {
          // Navegar a la ruta deseada después de cerrar el Sweet Alert
          this.router.navigate(['/ListEmpresas']);
        });
      },
      (error) => {
        console.error('Error al crear Empresa:', error);
  
        // Obtener el mensaje de error del objeto error
        let errorMessage = 'Ocurrió un error al crear la Empresa. Por favor, inténtalo de nuevo más tarde.';
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
  
  
  camposCompletos(): boolean {
    return !!(
        this.nuevaEmpresa.nombre_empresa &&
        this.nuevaEmpresa.nit_empresa &&
        this.nuevaEmpresa.direccion_empresa &&
        this.nuevaEmpresa.telefono_empresa &&
        this.nuevaEmpresa.email_empresa &&
        this.nuevaEmpresa.persona_contacto &&
        this.nuevaEmpresa.telefono_personac &&
        this.nuevaEmpresa.email_personac &&
        this.nuevaEmpresa.representante_legal &&
        this.nuevaEmpresa.telefono_representantel &&
        this.nuevaEmpresa.email_representantel
    );
}
//   camposCompletos(): boolean {
//     return !!(
//         this.nuevaEmpresa.nombre_empresa &&
//         this.nuevaEmpresa.nit_empresa &&
//         this.nuevaEmpresa.direccion_empresa &&
//         this.nuevaEmpresa.telefono_empresa &&
//         this.nuevaEmpresa.email_empresa &&
//         this.nuevaEmpresa.persona_contacto &&
//         this.nuevaEmpresa.telefono_personac &&
//         this.nuevaEmpresa.email_personac &&
//         this.nuevaEmpresa.representante_legal &&
//         this.nuevaEmpresa.telefono_representantel &&
//         this.nuevaEmpresa.email_representantel
//     );
// }

}
