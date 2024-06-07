import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PuestosVigilanciaService } from '../../../services/puestosvigilancia/puestosVig.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-puestos-vig',
  templateUrl: '../list-puestos-vig/list-puestos-vig.component.html',
  styleUrls: ['../list-puestos-vig/list-puestos-vig.component.css']
})
export class ListPuestosVigComponent implements OnInit {
  @ViewChild('modalContent') modalContent: ElementRef<any> | null = null;

  puestos: any[] = [];
  puestoData: any;
  errorMessage: string = '';
  dataSource: MatTableDataSource<any>;
  terminoBusqueda: string = '';
  noResultados: boolean = false;
  pageSize: number = 10;
  currentPage: number = 1;
  showModal: boolean = false;
  mostrarModalEditar: boolean = false;
  puestoSeleccionado: any = {};

  constructor(
    private puestosService: PuestosVigilanciaService,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.obtenerPuestos();
  }

  setPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  obtenerPuestos(): void {
    this.puestosService.obtenerPuestos().subscribe(
      (data) => {
        this.puestos = data.data[0];
        this.dataSource.data = this.puestos;
        this.filtrarVigilancia();
        console.log('pv.', this.puestos);
      },
      (error) => {
        this.errorMessage = 'Error al obtener los puestos';
      }
    );
  }

  crearPuesto(puestoData: any): void {
    this.puestosService.crearPuesto(puestoData).subscribe(
      (data) => {
        this.obtenerPuestos();
      },
      (error) => {
        this.errorMessage = 'Error al crear el puesto';
      }
    );
  }

  editarPuesto(id: number, nuevoPuestoData: any): void {
    this.puestosService.editarPuesto(id, nuevoPuestoData).subscribe(
      (data) => {
        this.obtenerPuestos();
      },
      (error) => {
        this.errorMessage = 'Error al editar el puesto';
      }
    );
  }

  eliminarPuesto(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.puestosService.eliminarPuesto(id).subscribe(
          (data) => {
            this.obtenerPuestos();
            Swal.fire(
              '¡Eliminado!',
              'El puesto ha sido eliminado.',
              'success'
            );
          },
          (error) => {
            this.errorMessage = 'Error al eliminar el puesto';
            Swal.fire(
              '¡Error!',
              'Hubo un problema al eliminar el puesto.',
              'error'
            );
          }
        );
      }
    });
  }

  handleCloseModal(): void {
    this.mostrarModalEditar = false;
  }

  actualizarLista(): void {
    this.obtenerPuestos();
  }

  abrirModalEditar(puesto: any): void {
    this.puestoSeleccionado = puesto;
    this.mostrarModalEditar = true;
    console.log(this.puestoSeleccionado);
  }

  filtrarVigilancia(): void {
    const termino = this.terminoBusqueda.toLowerCase();
    const puestosFiltradas = this.puestos.filter((puestovigilancia) => {
      return (
        puestovigilancia.descripcion_puesto.toLowerCase().includes(termino) ||
        puestovigilancia.tarifa_puesto.toLowerCase().includes(termino) ||
        puestovigilancia.ays.toLowerCase().includes(termino) ||
        puestovigilancia.total.toLowerCase().includes(termino)
      );
    });

    this.noResultados = puestosFiltradas.length === 0;
    this.dataSource.data = puestosFiltradas.length > 0 || this.terminoBusqueda === '' ? puestosFiltradas : this.puestos;
  }

  getPages(): number[] {
    const pageCount = Math.ceil(this.dataSource.data.length / this.pageSize);
    return Array(pageCount).fill(0).map((x, i) => i + 1);
  }
}
