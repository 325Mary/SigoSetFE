import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { VigilanciaElectronicaService } from '../../../services/PuestosElectronicos/vigilancia-electronica.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-ve',
  templateUrl: './listar-ve.component.html',
  styleUrls: ['./listar-ve.component.css']
})
export class ListarVEComponent implements OnInit {
  @ViewChild('modalContent') modalContent: ElementRef<any> | null = null;

  vigilanciasElectronicas: any[] = [];
  vigiElSeleccionada: any = {};
  vigilanciaVEF: any[] = [];
  showModal: boolean = false;
  mostrarModalEditar: boolean = false;
  mostrarModalCrear: boolean = false;
  terminoBusqueda: string = '';
  noResultados: boolean = false;
  pageSize: number = 10;
  currentPage: number = 1;

  constructor(private vigilanciaService: VigilanciaElectronicaService) { }

  ngOnInit(): void {
    this.obtenerVigilanciasElectronicas();
  }

  setPage(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  getPages(): number[] {
    const pageCount = Math.ceil(this.vigilanciasElectronicas.length / this.pageSize);
    return Array(pageCount).fill(0).map((x, i) => i + 1);
  }

  obtenerVigilanciasElectronicas(): void {
    this.vigilanciaService.obtenerVigilaciaElectronica().subscribe(
      response => {
        this.vigilanciasElectronicas = response.data[0];
        console.log('Puestos VE ',this.vigilanciasElectronicas);
        
        this.filtrarVE(); 
      },
      error => {
        console.error('Error al obtener las vigilancias electrónicas', error);
      }
    );
  }

  actualizarList(): void {
    this.obtenerVigilanciasElectronicas();
  }

  closeModal(): void {
    this.showModal = false;
    this.mostrarModalEditar = false;
    this.mostrarModalCrear = false;
  }

  handleCloseModal(): void {
    this.closeModal();
  }

  abrirModalEditar(vigilancia: any): void {
    this.vigiElSeleccionada = vigilancia;
    this.mostrarModalEditar = true;
  }

  eliminarVigilancia(id: number): void {
    Swal.fire({
      title: '¿Eliminar vigilancia electrónica?',
      text: '¿Estás seguro de que deseas eliminar esta vigilancia electrónica?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.vigilanciaService.eliminarVigilaciaElectronica(id).subscribe(
          () => {
            this.obtenerVigilanciasElectronicas();
            Swal.fire('Eliminado', 'La vigilancia electrónica ha sido eliminada', 'success');
          },
          error => {
            console.error('Error al eliminar la vigilancia electrónica:', error);
            Swal.fire('Error', 'No se pudo eliminar la vigilancia electrónica', 'error');
          }
        );
      }
    });
  }

  abrirModalCrear(): void {
    this.mostrarModalCrear = true;
  }

  filtrarVE(): any[] {
    const puestosFiltrados = this.vigilanciasElectronicas.filter((puestovigilanciaE) => {
      return (
        puestovigilanciaE.descripcion.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        puestovigilanciaE.tarifa.toLowerCase().includes(this.terminoBusqueda.toLocaleLowerCase())||
        puestovigilanciaE.ays.toLowerCase().includes(this.terminoBusqueda.toLocaleLowerCase()) ||
        puestovigilanciaE.total.toLowerCase().includes(this.terminoBusqueda.toLocaleLowerCase()) 
      );
    });
    this.noResultados = puestosFiltrados.length === 0;
    return puestosFiltrados;
  }
}
