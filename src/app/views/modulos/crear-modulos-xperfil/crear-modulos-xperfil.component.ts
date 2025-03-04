import { Component, OnInit } from '@angular/core';
import { ModuloService } from '../../../services/modulos/modulos.service';
import { PerfilService } from '../../../services/usuario/perfil.service';
import { ModulosXperfilService } from '../../../services/modulos/modulos-xperfil.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-modulos-xperfil',
  templateUrl: './crear-modulos-xperfil.component.html',
  styleUrls: ['./crear-modulos-xperfil.component.css']
})
export class CrearModulosXperfilComponent implements OnInit {

  modulos: any[] = [];
  perfiles: any[] = [];
  selectedModulo: number | null = null;
  selectedPerfil: number | null = null;
  permiso: string = '';
  // permiso: boolean = false;

  constructor(
    private moduloService: ModuloService,
    private perfilService: PerfilService,
    private modulosXPerfilService: ModulosXperfilService
  ) {}

  ngOnInit(): void {
    this.obtenerModulos();
    this.obtenerPerfiles();
  }

  obtenerModulos() {
    this.moduloService.obtenerModulos().subscribe(
      (response: any) => {
        this.modulos = response.data[0];
      },
      error => {
        console.error('Error al obtener los módulos:', error);
      }
    );
  }

  obtenerPerfiles() {
    this.perfilService.obtenerPerfiles().subscribe(
      (response: any) => {
        if (response && response.data && response.data.length > 0) {
          this.perfiles = response.data[0];
        } else {
          console.error('No se han recuperado perfiles');
        }
      },
      error => {
        console.error('Error al recuperar perfiles:', error);
      }
    );
  }

  crearModuloXperfil(): void {
    if (this.selectedModulo === null || this.selectedPerfil === null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe seleccionar un módulo y un perfil'
      });
      return;
    }

    const nuevoModuloXperfilData = {
      idmodulo: this.selectedModulo,
      idperfil: this.selectedPerfil,
      permiso: this.permiso
    };

    this.modulosXPerfilService.crearModuloXperfil(nuevoModuloXperfilData).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Módulo por perfil creado exitosamente'
        });
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al crear módulo por perfil'
        });
        console.error('Error al crear módulo por perfil:', error);
      }
    );
  }
}
