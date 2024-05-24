import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegionalService } from '../../../services/regional/regional.service';

@Component({
  selector: 'app-administrar-regional',
  templateUrl: './administrar-regional.component.html',
  styleUrls: ['./administrar-regional.component.css']
})
export class AdministrarRegionalComponent implements OnInit {
  errorMessage: string = '';
  regionales: any[]=[];

  constructor(private regionalService: RegionalService) { }

  ngOnInit(): void {
  this.listarRegionales(); // Llama al método para listar regionales al inicializar el componente
}
listarRegionales(): void {
  this.regionalService.getAllRegionals().subscribe(
    (response:any) => {
      this.regionales = response[0];
      console.log('regionales:', this.regionales)
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


}
