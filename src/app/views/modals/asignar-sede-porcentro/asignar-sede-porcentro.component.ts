import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SedesService } from '../../../services/sedes/sedes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignar-sede-porcentro',
  templateUrl: './asignar-sede-porcentro.component.html',
  styleUrls: ['./asignar-sede-porcentro.component.css']
})
export class AsignarSedePorcentroComponent {
  @Input() centroSeleccionado: any;
  @Output() actualizarLista = new EventEmitter<void>();
  @Input() mostrarModalAsignarSedes: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  sedes: any[] = [];
  sedesSeleccionadas: any[] = [];

  constructor(private sedesService: SedesService) {}

  ngOnInit(): void {
    this.cargarSedes();
  }

  close(): void {
    this.closeModal.emit();
  }

  cargarSedes() {
    this.sedesService.obtenerSedes().subscribe(
      (response) => {
        this.sedes = response; 
      },
      (error) => {
        console.error('Error al cargar las sedes:', error);
      }
    );
  }

  selectSede(event: any) {
    const value = event.target.value;
    const sedeSeleccionada = this.sedes.find(sede => sede.sede_formacion === value);
    if (sedeSeleccionada && !this.sedesSeleccionadas.includes(sedeSeleccionada)) {
      this.sedesSeleccionadas.push(sedeSeleccionada); 
    }
    event.target.value = ''; 
  }

  eliminarSedeSeleccionada(sede: any) {
    const index = this.sedesSeleccionadas.indexOf(sede);
    if (index !== -1) {
      this.sedesSeleccionadas.splice(index, 1); 
    }
  }

  asignarSedes() {
    if (this.sedesSeleccionadas.length === 0) {
      Swal.fire('¡Error!', 'Debe seleccionar al menos una sede para asignar.', 'error');
      return;
    }

    const idcentro_formacion = this.centroSeleccionado.idcentro_formacion; 
    
    this.sedesSeleccionadas.forEach(sede => {
      const nuevaSedeData = { idcentro_formacion }; 
      this.sedesService.editarSede(sede.idsede_formacion, nuevaSedeData).subscribe(
        (response) => {
          console.log(`Sede ${sede.idsede_formacion} asignada al centro ${idcentro_formacion}`);
          Swal.fire('¡Éxito!', `Sede  asignada al centro correctamente.`, 'success');
          this.closeModal.emit();
          this.actualizarLista.emit();
        },
        (error) => {
          console.error(`Error al asignar sede  al centro:`, error);
          Swal.fire('¡Error!', `Error al asignar sede  al centro.`, 'error');
        }
      );
    });

   
}
}
