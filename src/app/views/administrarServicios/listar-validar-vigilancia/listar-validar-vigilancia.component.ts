import { Component, OnInit } from '@angular/core';
import { DetalleContratoService } from "../../../services/detalleContrato/detalle-contrato.service";

@Component({
  selector: 'app-listar-validar-vigilancia',
  templateUrl: './listar-validar-vigilancia.component.html',
  styleUrls: ['./listar-validar-vigilancia.component.css']
})
export class ListarValidarVigilanciaComponent implements OnInit {
  detallesContratos: any[] = []; // Almacena los detalles de contratos
  detallesContratosAgrupados: any[] = []; // Almacena los detalles agrupados

  constructor(
    private detalleContratoService: DetalleContratoService,
  ) { }

  ngOnInit(): void {
    this.obtenerDetallesContratos();
  }

  obtenerDetallesContratos(): void {
    this.detalleContratoService.obtenerDetallesContratos().subscribe(
      (response) => {
        // Aplanamos la lista de detalles de contratos
        this.detallesContratos = response.data.flat();
        console.log('Detalles de contratos:', this.detallesContratos);

        // Agrupamos los detalles de contratos por nombreDetalleContrato
        const agrupados = this.detallesContratos.reduce((acc, detalle) => {
          const key = detalle.nombreDetalleContrato;
          if (key) { // Nos aseguramos de que la clave no sea undefined
            if (!acc[key]) {
              acc[key] = [];
            }
            acc[key].push(detalle);
          }
          return acc;
        }, {});

        // Convertimos el objeto de agrupación en un array de objetos, solo con los nombres
        this.detallesContratosAgrupados = Object.keys(agrupados).map(key => ({
          nombreDetalleContrato: key,
          idcentro_formacion: agrupados[key][0].idcentro_formacion
        }));

        console.log('Detalles de contratos agrupados:', this.detallesContratosAgrupados);
      },
      (error) => {
        console.error('Error al obtener los detalles de los contratos:', error);
      }
    );
  }

  editar(nombreDetalleContrato: string): void {
    console.log('Editar:', nombreDetalleContrato);
    // Aquí puedes agregar la lógica para editar
  }

  eliminar(nombreDetalleContrato: string): void {
    // Encuentra el detalle del contrato a eliminar
    const detalleAEliminar = this.detallesContratos.find(detalle => detalle.nombreDetalleContrato === nombreDetalleContrato);
    if (detalleAEliminar) {
      this.detalleContratoService.eliminarDetalleContrato(detalleAEliminar.iddetalle_contrato).subscribe(
        (response) => {
          console.log('Detalle de contrato eliminado:', response);
          this.obtenerDetallesContratos(); // Vuelve a cargar la lista de contratos
        },
        (error) => {
          console.error('Error al eliminar el detalle de contrato:', error);
        }
      );
    }
  }
}
