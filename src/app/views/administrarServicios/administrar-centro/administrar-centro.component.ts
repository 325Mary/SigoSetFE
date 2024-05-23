import { Component, OnInit } from '@angular/core';
import { ZonaService } from '../../../services/zona/zona.service';
import { CentroFormacionService } from '../../../services/centro-formacion/centro-formacion.service';
import { DepartamentoService } from '../../../services/Departamento/departamento.service';
import {MunicipioService} from '../../../services/Municipio/municipio.service'
import { PuestosVigilanciaService } from '../../../services/puestosvigilancia/puestosVig.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrar-centro',
  templateUrl: './administrar-centro.component.html',
  styleUrls: ['./administrar-centro.component.css']
})
export class AdministrarCentroComponent implements OnInit {
  zonas: any[] = [];
  departamentos: any[] = [];
  municipios: any[ ]= []
  centrosFormacion: any[] = [];
  servicios: any[] = []
  puestos: any[]=[]
  selectedZona: any;
  selectedDepartamento: any;
  selectedCentroFormacion: any;
  puestosSeleccionados: any[] = []; // Suponiendo que almacenas los puestos seleccionados aquí
  selectedServicio: string;
  servicioSeleccionado: string;
  puestoSeleccionado: any
  openSelect: string | null = null;
  cantidadPuestos: number = 0;
  
    constructor(
    private zonaService: ZonaService,
    private departamentoService: DepartamentoService,
    private centroFormacionService: CentroFormacionService,
    private municipioService: MunicipioService,
    private puestosService : PuestosVigilanciaService
  ) {}

  ngOnInit(): void {
    this.getZonas();
    this.getDepartamentos();
    this.getCentrosFormacion();
    this.getMunicpios();
    this.obtenerPuestos()
  }

  getZonas(): void {
    this.zonaService.getZona().subscribe(response => {
      this.zonas = response.data;
    });
  }

  onZonaSelected(value: any): void {
    this.selectedZona = value;
  }
  getDepartamentos(): void {
    this.departamentoService.obtenerDepartamentos().subscribe(response => {
      this.departamentos = response.data[0];
    });
  }
onDeparatamentoSelect(value: any): void {
  this.getDepartamentos = value
}

getMunicpios(): void {
  this.municipioService.obtenerMnucipios().subscribe(response => {
    this.municipios = response.data[0];
  });
}
onMunicipio( value: any): void {
  this.getMunicpios= value
}
  getCentrosFormacion(): void {
    this.centroFormacionService.getCentrosFormacion().subscribe(response => {
      this.centrosFormacion = response.data;
    });
  }
onCentroFSelect(value: any): void{
  this.getCentrosFormacion= value
}


  isSelectOpen(selectId: string): boolean {
    return this.openSelect === selectId;
  }

  toggleSelect(selectId: string): void {
    if (this.openSelect === selectId) {
      this.openSelect = null;
    } else {
      this.openSelect = selectId;
    }
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
  aumentarCantidad(puesto: any): void {
    // Aumentar la cantidad del puesto seleccionado
    puesto.cantidad++;
  }
  
      }