import { Component, OnInit } from '@angular/core';
import { ModulosXperfilService } from '../../../services/modulos/modulos-xperfil.service';

@Component({
  selector: 'app-listar-modulos-xperfil',
  templateUrl: './listar-modulos-xperfil.component.html',
  styleUrls: ['./listar-modulos-xperfil.component.css']
})
export class ListarModulosXperfilComponent implements OnInit {
  
  modulosXPerfil: any[] = [];
  perfiles: string[] = [];
  modulos: string[] = [];
  permissionsMatrix: any = {};
  errorMessage: string | null = null;

  constructor(private modulosXPerfilService: ModulosXperfilService) { }

  ngOnInit(): void {
    this.obtenerModulosXPerfil();
  }

  obtenerModulosXPerfil(): void {
    this.modulosXPerfilService.obtenerModulosXperfil().subscribe({
      next: (response) => {
        this.modulosXPerfil = response.data;
        this.transformData();
      },
      error: (error) => {
        this.errorMessage = `Error fetching data: ${error.message}`;
      }
    });
  }

  transformData(): void {
    const perfilesSet = new Set<string>();
    const modulosSet = new Set<string>();
    
    this.modulosXPerfil.forEach(item => {
      perfilesSet.add(item.perfil);
      modulosSet.add(this.formatUrl(item.url_modulo));

      if (!this.permissionsMatrix[this.formatUrl(item.url_modulo)]) {
        this.permissionsMatrix[this.formatUrl(item.url_modulo)] = {};
      }
      this.permissionsMatrix[this.formatUrl(item.url_modulo)][item.perfil] = item.permiso;
    });

    this.perfiles = Array.from(perfilesSet);
    this.modulos = Array.from(modulosSet);
  }

  formatUrl(url: string): string {
    return url.startsWith('/') ? url.substring(1) : url;
  }

  togglePermission(modulo: string, perfil: string, event: any): void {
    const nuevoPermiso = event.target.checked ? 'si' : 'no'; 
    this.permissionsMatrix[modulo][perfil] = nuevoPermiso;

    // Assuming idmodulo and idperfil are part of the item and are numbers
    const idmodulo = this.getModuloId(modulo);
    const idperfil = this.getPerfilId(perfil);

    const moduloxperfilData = { permiso: nuevoPermiso };
    
    this.modulosXPerfilService.editarModuloXperfil(idmodulo, idperfil, moduloxperfilData).subscribe({
      next: (response) => {
        console.log('Permission updated successfully', response);
      },
      error: (error) => {
        this.errorMessage = `Error updating permission: ${error.message}`;
      }
    });
  }

  getModuloId(modulo: string): number {
    // Implement this to return the correct idmodulo based on the URL or name
    const found = this.modulosXPerfil.find(item => this.formatUrl(item.url_modulo) === modulo);
    return found ? found.idmodulo : 0;
  }

  getPerfilId(perfil: string): number {
    // Implement this to return the correct idperfil based on the name
    const found = this.modulosXPerfil.find(item => item.perfil === perfil);
    return found ? found.idperfil : 0;
  }
}
