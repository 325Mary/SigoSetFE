import { Component } from '@angular/core';
import { LoginService } from '../../../services/usuario/login.service';
import { PerfilService } from '../../../services/usuario/perfil.service';
import { CentroFormacionService } from '../../../services/centro-formacion/centro-formacion.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

interface Perfil {
  idperfil: number;
  perfil: string;
}


@Component({
  selector: 'app-crear-users',
  templateUrl: './crear-users.component.html',
  styleUrls: ['./crear-users.component.css']
})
export class CrearUsersComponent {
  registroData: any = {
    idperfil: '',
    idcentro_formacion: '',
    identificacion: '',
    nombre_usuario: '',
    apellido_usuario: '',
    telefono_usuario: '',
    email_usuario: '',
    estado: ''
  };
  perfiles: Perfil[] = [];
  centrosF: any[] = [];
  mostrarMensaje: boolean = false;
  caracteresTelefono: boolean = false;
  caracteresIdentificacion: boolean = false;
  perfilSeleccionado:any
  centroSeleccionado:any

  constructor(
    private authService: LoginService,
    private perfilService: PerfilService,
    private centroS: CentroFormacionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerPerfiles();
    this.obtenerCentros();
  }

  obtenerPerfiles() {
    this.perfilService.obtenerPerfiles().subscribe(
      (response: any) => {
        console.log(response);
        if (response && response.data && response.data.length > 0) {
          this.perfiles = response.data[0];
        } else {
          console.error('No se han recuperado perfiles');
        }
      },
      error => {
        console.error('Error al recuperar perfiles:', error);
      }
    );
  }

  obtenerCentros() {
    this.centroS.getCentrosFormacion().subscribe(
      (response: any) => {
        console.log(response);
        if (response && response.data && response.data.length > 0) {
          this.centrosF = response.data;
        } else {
          console.error('No se han recuperado centros de formacion');
        }
      },
      error => {
        console.error('Error al recuperar centros de formacion :', error);
      }
    );
  }

  onSubmit() {
    if (this.validarFormulario()) {
      this.authService.registrarUsuario(this.registroData).subscribe(
        response => {
          Swal.fire({
            icon: 'success',
            title: '¡Registro exitoso!',
            text: 'El usuario ha sido registrado correctamente.'
          }).then((response)=>{
            this.router.navigate(['/listarUsuarios'])
          })
        },
        error => {
          const errorBack = error.error ? error.error.message : 'Error desconocido';
          Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: errorBack
          });
          console.error('Error del backend:', error);
        }
      );
    } else {
      console.error('Formulario no válido');
    }
  }

  onPerfilSelected(event:any):void{
    const selectPerfil= event.target.value;
    const selectedPerfil = this.perfiles.find(perfil=>perfil.perfil === selectPerfil);
    if(selectedPerfil){
      this.perfilSeleccionado= selectedPerfil.idperfil;
      console.log('Id Perfil seleccionado',this.perfilSeleccionado);
      
    }
  }

  onCenterSelect(event:any):void{
    const selectCentro = event.target.value;
    const selectedCenter = this.centrosF.find(centro=>centro.centro_formacion === selectCentro);
    if(selectedCenter){
      this.centroSeleccionado = selectedCenter.idcentro_formacion;
      console.log('Id del Centro',this.centrosF);
      
    }
  }

  verificarEmail() {
    this.mostrarMensaje = this.registroData.email_usuario && !this.validarEmail(this.registroData.email_usuario);
  }

  validarEmail(email: string): boolean {
    return email.includes('@');
  }

  verificarTelefono() {
    this.mostrarMensaje = this.registroData.telefono_usuario && !this.validarTelefono(this.registroData.telefono_usuario);
    this.caracteresTelefono = this.registroData.telefono_usuario.length > 10;
  }

  validarTelefono(telefono_usuario: string): boolean {
    const telefonoRegex = /^\d{10}$/;
    return telefonoRegex.test(telefono_usuario);
  }

  validarFormulario(): boolean {
    const emailValido = this.validarEmail(this.registroData.email_usuario);
    return (
      this.registroData.idperfil &&
      this.registroData.idcentro_formacion &&
      this.registroData.identificacion &&
      this.registroData.nombre_usuario &&
      this.registroData.apellido_usuario &&
      this.registroData.telefono_usuario &&
      this.registroData.perfil&&
      emailValido &&
      this.registroData.estado
    );
  }

  onInput(event: any, campo: string) {
    const input = event.target.value;
    if (input.length > 10) {
      if (campo === 'telefono_usuario') {
        this.caracteresTelefono = true;
        this.registroData.telefono_usuario = input.slice(0, 10);
      } else if (campo === 'identificacion') {
        this.caracteresIdentificacion = true;
        this.registroData.identificacion = input.slice(0, 10);
      }
    } else {
      if (campo === 'telefono_usuario') {
        this.caracteresTelefono = false;
      } else if (campo === 'identificacion') {
        this.caracteresIdentificacion = false;
      }
    }
  }
}
