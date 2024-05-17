import { Component, ViewChild, ElementRef , Input, Output, EventEmitter} from '@angular/core';
import { PuestosEXcentroService } from '../../../../services/PuestosXcentro/puestos-excentro.service';
import {PuestosVXcentroService} from '../../../../services/PuestosXcentro/puestos-vxcentro.service'
import { PuestosVigilanciaService } from '../../../../services/puestosvigilancia/puestosVig.service';
import { VigilanciaElectronicaService} from '../../../../services/PuestosElectronicos/vigilancia-electronica.service'

@Component({
  selector: 'app-puesto-vx-centro',
  templateUrl: './puesto-vx-centro.component.html',
  styleUrls: ['./puesto-vx-centro.component.css']
})
export class PuestoVxCentroComponent  {
  @Input() centroSeleccionado: any; 
  @Output() closeModal = new EventEmitter<void>();
  @Output() actualizarLista = new EventEmitter<void>();
  @Input() mostrarModal : boolean
  puestoVxCentro: any;
  puestoExCentro: any;
  puestos: any[]=[]
  vigiElectronica: any[ ]= [];
  servicioSeleccionado: string;
  puestosSeleccionados: any[] = []; // Suponiendo que almacenas los puestos seleccionados aquí
  openSelect: string | null = null;


  constructor( private _puestosEXCentroService: PuestosEXcentroService,
    private _puestosVXCentroService: PuestosVXcentroService,
    private puestosService : PuestosVigilanciaService,
    private vigilanciaElectronicaS : VigilanciaElectronicaService
) { }

  ngOnInit(): void {
    this.obtenerPuestos();
    this.obtenerVigilanciaElectronica()
  }


  getPuestosVxCentro(idcentro_formacion: number) {
    this._puestosVXCentroService.obtenerPuestosVxCentro(idcentro_formacion).subscribe(data => {
        this.puestoVxCentro = data;
        console.log('Puestos Vx Centro:', this.puestoVxCentro);
    }, error => {
        console.error(error);
    });
  }
  
  getPuestosExCentro(idcentro_formacion: number) {
    this._puestosEXCentroService.obtenerPuestosExCentro(idcentro_formacion).subscribe(data => {
        this.puestoExCentro = data;
        console.log('Puestos Ex Centro:', this.puestoExCentro);
    }, error => {
        console.error(error);
    });
  }
 
  obtenerPuestos(): void {
    this.puestosService.obtenerPuestos().subscribe(
      (data) => {
        this.puestos = data.data[0];
        // Actualizar el dataSource con los datos obtenidos, si es necesario
      },
      (error) => {
        error;
      }
    );
 
  }

  obtenerVigilanciaElectronica(): void {
    this.vigilanciaElectronicaS.obtenerVigilaciaElectronica().subscribe(
    (data) => {
      this.vigiElectronica = data.data[0]
      console.log('vig:', this.vigiElectronica)
    },
    (error) => {
      error;
    }
    )
  }

  onServicioSelected(servicio: string): void {
    this.servicioSeleccionado = servicio; // Asignar el servicio seleccionado a servicioSeleccionado
    if (servicio === 'vigilancia') {
      this.obtenerPuestos(); // Llamar al método para obtener los puntos de vigilancia
    }
  }
  onPuestoVigilanciaSelected(idpuesto_vigilancia: any): void {
    // Convertir el valor a número
    const selectedId = Number(idpuesto_vigilancia);
    
    // Buscar el puesto seleccionado por su ID
    const puestoSeleccionado = this.puestos.find(puesto => puesto.idpuesto_vigilancia === selectedId);
    if (puestoSeleccionado) {
      // Verificar si el puesto ya ha sido seleccionado
      if (!puestoSeleccionado.seleccionado) {
        // Inicializar la cantidad del puesto seleccionado
        puestoSeleccionado.cantidad = 0;
        puestoSeleccionado.seleccionado = true; // Marcar el puesto como seleccionado
        this.puestosSeleccionados.push(puestoSeleccionado);
      } else {
        // Mostrar un mensaje o tomar alguna acción en caso de que el puesto ya esté seleccionado
        console.log('Este puesto ya ha sido seleccionado.');
      }
    }
  }
  onVigilanciaElectronicaSelected(idvigilancia_electronica: any): void {
    // Convertir el valor a número
    const selectedId = Number(idvigilancia_electronica);
    
    // Buscar el puesto seleccionado por su ID
    const puestoSeleccionado = this.puestos.find(puesto => puesto.idvigilancia_electronica === selectedId);
    if (puestoSeleccionado) {
      // Verificar si el puesto ya ha sido seleccionado
      if (!puestoSeleccionado.seleccionado) {
        // Inicializar la cantidad del puesto seleccionado
        puestoSeleccionado.cantidad = 0;
        puestoSeleccionado.seleccionado = true; // Marcar el puesto como seleccionado
        this.puestosSeleccionados.push(puestoSeleccionado);
      } else {
        // Mostrar un mensaje o tomar alguna acción en caso de que el puesto ya esté seleccionado
        console.log('Este puesto ya ha sido seleccionado.');
      }
    }
  }

  isSelectOpen(selectId: string): boolean {
    return this.openSelect === selectId;
  }
  aumentarCantidad(puesto: any): void {
    // Aumentar la cantidad del puesto seleccionado
    puesto.cantidad++;
  }
  

  close(): void {
    this.closeModal.emit();
  }
}
