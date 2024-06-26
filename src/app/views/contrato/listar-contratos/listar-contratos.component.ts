import { Component, ViewChild, ElementRef } from '@angular/core';
import { ContratoService } from '../../../services/contrato/contrato.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-contratos',
  templateUrl: './listar-contratos.component.html',
  styleUrls: ['./listar-contratos.component.css']
})
export class ListarContratosComponent {
  @ViewChild('modalContent') modalContent: ElementRef<any> | null = null;
  contratos: any[] = [];
  contratosFiltrados: any[] = [];
  pageSize: number = 6;
  currentPage: number = 1;
  contratoSeleccionado: any = {};
  mostrarModalCrear: boolean = false;
  mostrarModalEditar: boolean = false;
  terminoBusqueda: string = '';
  noResultados: boolean = false;

  constructor(private contratoService: ContratoService) {}

  ngOnInit(): void {
    this.obtenerContratos();
  }

  obtenerContratos() {
    this.contratoService.obtenerContratos().subscribe(
      (response) => {
        this.contratos = response.data[0];
        this.contratosFiltrados = [...this.contratos];
      },
      (error) => {
        console.error('Error al obtener contratos:', error);
      }
    );
  }

  abrirModalCrear(): void {
    this.mostrarModalCrear = true;
  }

  actualizarContratos(): void {
    this.obtenerContratos();
  }

  closeModal(): void {
    this.mostrarModalCrear = false;
    this.mostrarModalEditar = false;
    this.refreshList();
  }

  handleCloseModal(): void {
    this.closeModal();
  }

  abrirModalEditar(contrato: any): void {
    this.contratoSeleccionado = contrato;
    this.mostrarModalEditar = true;
  }

  eliminarContrato(idContrato_empresa: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.contratoService.eliminarContrato(idContrato_empresa).subscribe(
          () => {
            Swal.fire(
              '¡Eliminado!',
              'El contrato ha sido eliminado correctamente.',
              'success'
            );
            this.obtenerContratos();
            this.refreshList();
          },
          (error) => {
            Swal.fire(
              '¡Error!',
              'Ocurrió un error al intentar eliminar el contrato.',
              'error'
            );
            console.error('Error al eliminar contrato:', error);
          }
        );
      }
    });
  }

  filtrarContratos(): void {
    const termino = this.terminoBusqueda.trim().toLowerCase();
    if (termino) {
      this.contratosFiltrados = this.contratos.filter((contrato) => {
        return (
          (contrato.nombre_empresa && contrato.nombre_empresa.toLowerCase().includes(termino)) ||
          (contrato.descripcion_contrato && contrato.descripcion_contrato.toLowerCase().includes(termino)) ||
          (contrato.fecha_inicio && contrato.fecha_inicio.toLowerCase().includes(termino)) ||
          (contrato.fecha_fin && contrato.fecha_fin.toLowerCase().includes(termino))
        );
      });
      this.noResultados = this.contratosFiltrados.length === 0;
    } else {
      this.contratosFiltrados = [...this.contratos];
      this.noResultados = false;
    }
  }
  

  contratoIndex(contrato: any): number {
    return this.contratosFiltrados.indexOf(contrato) + 1;
  }

  private refreshList() {
    this.contratoService.obtenerContratos().subscribe(
      (response) => {
        if (response.data && response.data.length > 0) {
          this.contratos = response.data[0];
          this.contratosFiltrados = [...this.contratos];
        } else {
          console.error('La respuesta no contiene datos o el primer array está vacío.');
        }
      },
      (error) => {
        console.error('Error al obtener la lista de contratos:', error);
      }
    );
  }

  pageChange(event: number): void {
    this.currentPage = event;
  }
}
