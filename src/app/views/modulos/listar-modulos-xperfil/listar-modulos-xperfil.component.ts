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
  modulosXperfilFitrados: any[] = []
  permissionsMatrix: any = {};
  errorMessage: string | null = null;
  pageSize: number = 10;
  currentPage: number = 1;
  noResultados: boolean = false;
  terminoBusqueda: string = '';

  constructor(private modulosXPerfilService: ModulosXperfilService) { }

  ngOnInit(): void {
    this.obtenerModulosXPerfil();
  }

  obtenerModulosXPerfil(): void {
    this.modulosXPerfilService.obtenerModulosXperfil().subscribe({
      next: (response) => {
        this.modulosXPerfil = response.data;
        this.transformData();
        this.filtrarMxP();
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
    const found = this.modulosXPerfil.find(item => this.formatUrl(item.url_modulo) === modulo);
    return found ? found.idmodulo : 0;
  }

  getPerfilId(perfil: string): number {
    const found = this.modulosXPerfil.find(item => item.perfil === perfil);
    return found ? found.idperfil : 0;
  }

  filtrarMxP(): void {
    if (this.terminoBusqueda.trim() !== '') {
      this.modulosXperfilFitrados = this.modulos.filter(modulo =>
        modulo.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
      );
      this.noResultados = this.modulosXperfilFitrados.length === 0;
    } else {
      this.modulosXperfilFitrados = [...this.modulos]
    }


  }



  // setPage(pageNumber: number): void {
  //   this.currentPage = pageNumber;
  // }

  // getPages(): number[] {
  //   const pageCount = Math.ceil(this.modulos.length / this.pageSize);
  //   return Array(pageCount).fill(0).map((x, i) => i + 1);
  // }
  pageChange(event: number): void {
    this.currentPage = event;
  }
}
