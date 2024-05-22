import { Component, Input, Output, EventEmitter } from '@angular/core';
import { VigilanciaElectronicaService } from "../../../services/PuestosElectronicos/vigilancia-electronica.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-ve',
  templateUrl: './editar-ve.component.html',
  styleUrls: ['./editar-ve.component.css']
})
export class EditarVEComponent  {
  @Input() vigiElSeleccionada: any; 
  @Output() closeModal = new EventEmitter<void>();
  @Output() actualizarList = new EventEmitter<void>();
  
  constructor(private vigilanciaService: VigilanciaElectronicaService) { }

  ngOnInit(): void {
  }

  actuaList(): void {
    // Crea un objeto con solo los campos relevantes para la actualización
    const datosActualizados = {
      descripcion: this.vigiElSeleccionada.descripcion,
      tarifa: this.vigiElSeleccionada.tarifa,
    };

    // Llama al servicio para editar la vigilancia electrónica
    this.vigilanciaService.editarVigilaciaElectronica(this.vigiElSeleccionada.idvigilancia_electronica, datosActualizados)
      .subscribe(
        () => {
          // Notifica al componente padre que se ha actualizado la lista
          this.actualizarList.emit();
          // Cierra el modal
          this.closeModal.emit();
          // Muestra un mensaje de éxito
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Vigilancia electrónica actualizada exitosamente.'
          });
        },
        error => {
          // Muestra un mensaje de error si ocurre algún problema
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al actualizar la vigilancia electrónica.'
          });
          console.error('Error al actualizar la vigilancia electrónica:', error);
        }
      );
  }

  
  close(): void {
    this.closeModal.emit();
  }

  calcularTotales(): void {
    // Calcula los valores de Ays, IVA y Total a partir de la tarifa ingresada
    // Puedes utilizar la lógica de cálculo que tengas en tu backend o adaptarla aquí mismo
    if (this.vigiElSeleccionada.tarifa) {
      this.vigiElSeleccionada.ays = this.vigiElSeleccionada.tarifa * 0.08;
      this.vigiElSeleccionada.iva = (this.vigiElSeleccionada.tarifa + this.vigiElSeleccionada.ays) * 0.019;
      this.vigiElSeleccionada.total = this.vigiElSeleccionada.tarifa + this.vigiElSeleccionada.ays + this.vigiElSeleccionada.iva;
    } else {
      this.vigiElSeleccionada.ays = 0;
      this.vigiElSeleccionada.iva = 0;
      this.vigiElSeleccionada.total = 0;
    }
  }
}
