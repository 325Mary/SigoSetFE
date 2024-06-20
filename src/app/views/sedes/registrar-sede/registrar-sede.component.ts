import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SedesService } from 'app/services/sedes/sedes.service';
import { MunicipioService } from 'app/services/Municipio/municipio.service';


@Component({
  selector: 'app-registrar-sede',
  templateUrl: './registrar-sede.component.html',
  styleUrls: ['./registrar-sede.component.css']
})
export class RegistrarSedeComponent implements OnInit {
  sedes: any[] = [];
  errorMessage: string = '';
  mostrarMensajeEmail: boolean = false;

  sedesData: any = {
    sedeformacion: '',
    idmunicipio: '',
    dir_sede_formacion: '',
    telefono_sedef: '',
    email_sedef: ''
  };
  mostrarMensajeTelefono: boolean = false;
  caracteresTelefono: boolean = false;
  listMunicipios: any[] = [];
  selectedMunicipio: string = '';
  municipioseleccionado: any;

  constructor(private sedesServices: SedesService, private router: Router, private municipioService: MunicipioService) { }

  ngOnInit(): void {
    this.obtenerSedes();
    this.obtenerMunicipios();
  }

  obtenerSedes(): void {
    this.sedesServices.obtenerSedes().subscribe(
      (data) => {
        this.sedes = data.data;
      },
      (error) => {
        this.errorMessage = 'Error al obtener las sedes';
      }
    );
  }

  obtenerMunicipios() {
    this.municipioService.obtenerMunicipios().subscribe(
      (response: any) => {
        console.log('Municipios ',response);
        if (response && response.data && response.data.length > 0) {
          this.listMunicipios = response.data[0];
        } else {
          console.error('No se han recuperado centros de formación');
        }
      },
      error => {
        console.error('Error al recuperar centros de formación:', error);
      }
    );
  }


  onSubmit() {
    if (this.validarSedes()) {
      this.sedesServices.creaSede(this.sedesData).subscribe(
        (response) => {
          this.sedesData = { sedeformacion: '', dir_sede_formacion: '',idmunicipio:'',
             telefono_sedef: '', email_sedef: '' };
          this.errorMessage = null;
          Swal.fire({
            icon: 'success',
            title: 'Sede creada!',
            text: 'La Sede ha sido creado correctamente.'
          }).then(() => {
            this.router.navigate(['/ListarSedesdeFormacion']);
          });
        },
        (error) => {
          console.error('Error creando sede electrónica', error);
          this.errorMessage = 'Error creando la sede. Por favor, intenta nuevamente.';
          Swal.fire('¡Error!', 'Error creando la sede. Por favor, intenta nuevamente.', 'error');
        }
      );
    }
  }

  crearSede(sedesData: any): void {
    this.sedesServices.creaSede(sedesData).subscribe(
      (data) => {
        this.obtenerSedes();
      },
      (error) => {
        this.errorMessage = 'Error al crear la sede';
      }
    );
  }

  editarPuesto(idsede_formacion: number, nuevaSedeData: any): void {
    this.sedesServices.editarSede(idsede_formacion, nuevaSedeData).subscribe(
      (data) => {
        this.obtenerSedes();
      },
      (error) => {
        this.errorMessage = 'Error al editar el puesto';
      }
    );
  }

  eliminarSede(idsede_formacion: number): void {
    this.sedesServices.eliminarSede(idsede_formacion).subscribe(
      (data) => {
        this.obtenerSedes();
      },
      (error) => {
        this.errorMessage = 'Error al eliminar el puesto';
      }
    );
  }



  verificarTelefono() {
    this.mostrarMensajeTelefono = this.sedesData.telefono_sedef && !this.validarTelefono(this.sedesData.telefono_sedef);
    this.caracteresTelefono = this.sedesData.telefono_sedef.length > 10;
  }

  validarTelefono(telefono_sedef: string): boolean {
    const telefonoRegex = /^\d{10}$/;
    return telefonoRegex.test(telefono_sedef);
  }

  verificarEmail() {
    this.mostrarMensajeEmail = this.sedesData.email_sedef && !this.validarEmail(this.sedesData.email_sedef);
  }

  validarEmail(email: string): boolean {
    return email.includes('@');
  }


  // validarSedes(): boolean {
  //   const telefonoValidado = this.validarTelefono(this.sedesData.telefono_sedef);
  //   const emailValido = this.validarEmail(this.sedesData.email_sedef);

  //   return (
  //     this.sedesData.sedeformacion &&
  //     this.sedesData.idmunicipio &&
  //     this.sedesData.dir_sede_formacion &&
  //     emailValido &&
  //     telefonoValidado
  //   );
  // }
  validarSedes(): boolean {
    const camposFaltantes = [];
  
    if (!this.sedesData.sedeformacion) {
      camposFaltantes.push('Nombre de la sede');
    }
    if (!this.sedesData.idmunicipio) {
      camposFaltantes.push('Municipio');
    }
    if (!this.sedesData.dir_sede_formacion) {
      camposFaltantes.push('Dirección de la sede');
    }
    if (!this.validarEmail(this.sedesData.email_sedef)) {
      camposFaltantes.push('Email');
    }
    if (!this.validarTelefono(this.sedesData.telefono_sedef)) {
      camposFaltantes.push('Teléfono');
    }
  
    if (camposFaltantes.length > 0) {
      console.log('Campos faltantes: ', camposFaltantes.join(', '));
      return false;
    }
  
    return true;
  }
  onMunicipioSelected(event: any): void {
    const selectMunicipio = event.target.value;
    const selectedMunicipio = this.listMunicipios.find(m => m.municipio === selectMunicipio);
    if (selectedMunicipio) {
      this.municipioseleccionado = selectedMunicipio.idmunicipio; 
      console.log('Id municipio seleccionado', this.listMunicipios);
    }
  }

  
}
