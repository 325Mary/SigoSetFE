import { Component, OnInit } from '@angular/core';
import { RegionalService } from '../../../services/regional/regional.service';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';


@Component({
  selector: 'app-administrar-regional',
  templateUrl: './administrar-regional.component.html',
  styleUrls: ['./administrar-regional.component.css']
})
export class AdministrarRegionalComponent implements OnInit {

  @ViewChild('modalContent') modalContent: ElementRef<any> | null = null;
  errorMessage: string = '';
  regionales: any[] = [];
  pageSize: number = 10; // Número de usuarios por página
  currentPage: number = 1; // Página actual
  terminoBusqueda: string = '';
  regionalesFiltradas: any[] = [];
  noResultados: boolean = false;
  constructor(private regionalService: RegionalService) { }

  ngOnInit(): void {
    this.listarRegionales(); // Llama al método para listar regionales al inicializar el componente
  }
  listarRegionales(): void {
    this.regionalService.getAllRegionals().subscribe(
      response => {
        this.regionales = response[0];
        console.log('regionales:', this.regionales)
        this.filtrarRegionales();
      },
      error => {
        console.error('Error al obtener las regionales:', error);
        this.errorMessage = 'Error al obtener las regionales. Por favor, inténtalo de nuevo más tarde.';
      }
    );
  }

  editarRegional(index: number): void {
    // Cambiar la propiedad 'editando' del objeto regional en la lista
    this.regionales[index].editando = true;
  }

  guardarCambios(index: number): void {
    // Enviar los datos actualizados al servidor
    const regionalEditado = this.regionales[index];
    this.regionalService.updateRegional(regionalEditado.idRegional, regionalEditado).subscribe(
      response => {
        console.log('Regional actualizada exitosamente:', response);
        // Cambiar a la vista de lectura
        regionalEditado.editando = false;
      },
      error => {
        console.error('Error al actualizar la regional:', error);
        // Manejar el error, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }
  filtrarRegionales(): void {
    if (this.terminoBusqueda.trim() !== '') {
   this.regionalesFiltradas = this.regionales.filter((regional) => {
      return (
        regional.regional.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        regional.direccion.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) 
      
      );
    });
    this.noResultados = this.regionalesFiltradas.length === 0;
    this.currentPage=1

  }else{
    this.regionalesFiltradas=[...this.regionales]
  }
}
  pageChange(event: number): void {
    this.currentPage = event;
  }


}
