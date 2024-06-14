import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CentroFormacion } from 'app/models/centro-formacion/centro-formacion';
import { CentroFormacionService } from 'app/services/centro-formacion/centro-formacion.service';
import { ZonaService } from 'app/services/zona/zona.service';
import { RegionalService } from 'app/services/regional/regional.service';
import Swal from 'sweetalert2';
import { AdministrarRegionalComponent } from 'app/views/Regionales/administrar-regional/administrar-regional.component';

@Component({
  selector: 'app-registrar-centro-formacion',
  templateUrl: './registrar-centro-formacion.component.html',
  styleUrls: ['./registrar-centro-formacion.component.css']
})
export class RegistrarCentroFormacionComponent implements OnInit {
  telefonoForm: FormGroup;
  mostrarMensajeEmail: boolean = false;
  nombreBoton = 'REGISTRAR';
  titulo = 'Registrar Centro De Formacion';
  cambiarFormulario = 0;
  id: string | null;
  centroFormacionForm: FormGroup;
  datosFormulario: any;
  listaRegionales: any[] = [];
  listaZonas: any[] = [];
  regionales: any[]
  regionalSelected: any
  submitted: boolean = false;
  regional_seleccionado: any;
  zonaselected: any
  zona: any[]
  mostrarMensajeTelefono: boolean = false;

  registroData: any = {
    email_usuario: '',
    telefono_centrof: ''
  }
  caracteresTelefono: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private aRoute: ActivatedRoute,
    private _zonaService: ZonaService,
    private _regionalService: RegionalService,
    private _centroFormacionService: CentroFormacionService
) {
    this.centroFormacionForm = this.fb.group({
        centro_formacion: ['', Validators.required],
        dir_centro_formacion: ['', Validators.required],
        telefono_centrof: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        email_centrof: ['', [Validators.required, Validators.email]],
        idRegional: ['', Validators.required],
        idzona: ['', Validators.required],
    });

    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log('centro id', this.id);
}

  ngOnInit(): void {
    this.getlistaZonas();
    this.getListaRegionales();
    this.getCentroFormacion();
    this.telefonoForm = this.fb.group({
      telefono_centrof: ['', [Validators.required, Validators.maxLength(10)]]
    });
  }

  validatePhoneNumber(): void {
    const telefonoControl = this.telefonoForm.get('telefono_centrof');
    if (telefonoControl?.value.length > 10) {
      alert("El número de teléfono no puede exceder los 10 dígitos.");
      telefonoControl.setValue(telefonoControl.value.slice(0, 10));
    }
  }
  changeNextForm() {
    this.cambiarFormulario = 1;
  }

  changeForm2() {
    this.cambiarFormulario = 0;
  }
  getlistaZonas() {
    this._zonaService.getZona().subscribe(data => {
      this.listaZonas = data.data;
      console.log(this.listaZonas);
    }, error => {

    });
  }
  getListaRegionales(): void {
    this._regionalService.getAllRegionals()
      .subscribe(
        (result: AdministrarRegionalComponent[]) => {
          this.listaRegionales = result;
          this.listaRegionales = this.listaRegionales[0];
          console.log('lista Regionales obtenidos:', this.listaRegionales);
        },
        (error: any) => {
          console.error('Error al obtener los listaRegionales:', error);
        }
      );
  }

  onZonaSelected(event: any): void {
    const selectedZonaName = event.target.value;
    const selectedZona = this.listaZonas.find(zona_name => zona_name.Nombre_zona === selectedZonaName);
    if (selectedZona) {
      this.zonaselected = selectedZona.idzona;
      console.log('Id de la zona seleccionada:', this.zonaselected);
    }
  }

  onRegionalSelected(event: any): void {
    const selectRegionalForm = event.target.value;
    const selectRegional = this.listaRegionales.find(regional => regional.regional === selectRegionalForm);
    if (selectRegional) {
      this.regional_seleccionado = selectRegional.idRegional;
      console.log('Correcto id:', this.regional_seleccionado);

    }
  }

  updateZonaId(event: any): void {
    const zonaNombre = event.target.value;
    const selectedZona = this.listaZonas.find(zona => zona.Nombre_zona === zonaNombre);
    if (selectedZona) {
      this.centroFormacionForm.patchValue({ idzona: selectedZona.idzona });
    }
  }

  updateRegionalId(event: any): void {
    const regionalNombre = event.target.value;
    const selectedRegional = this.listaRegionales.find(regional => regional.regional === regionalNombre);
    if (selectedRegional) {
      this.centroFormacionForm.patchValue({ idRegional: selectedRegional.idRegional });
    }
  }

  guardarOActualizaCentroFormacion() {
    if (this.centroFormacionForm.valid) {
        const centroFormacion: CentroFormacion = {
            centro_formacion: this.centroFormacionForm.get('centro_formacion')?.value,
            dir_centro_formacion: this.centroFormacionForm.get('dir_centro_formacion')?.value,
            telefono_centrof: this.centroFormacionForm.get('telefono_centrof')?.value,
            email_centrof: this.centroFormacionForm.get('email_centrof')?.value,
            idRegional: this.centroFormacionForm.get('idRegional')?.value,
            idzona: this.centroFormacionForm.get('idzona')?.value,
        };

        if (this.id !== null) {
            this.editarCentroFormacion(centroFormacion);
        } else {
            this.guardarCentroFormacion(centroFormacion);
        }
    } else {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Campos Incompletos',
            text: 'Por favor llena todos los campos correctamente',
            showConfirmButton: true
        });
    }
}

  editarCentroFormacion(centroFormacion: CentroFormacion) {
    if (this.centroFormacionForm.valid) {
      this._centroFormacionService.editarCentroFormacion(this.id, centroFormacion).subscribe(
        (data: any) => {
          if (data.status === 'success') {
            Swal.fire({
              icon: 'success',
              title: 'Centro de Formación actualizado exitosamente',
              showConfirmButton: true
            }).then((result) => {
              if (result.isConfirmed) {
                this.route.navigate(['/listaCentroFormacion']);
              }
            });
          }
        },
        (error) => {
          // Handle errors
        }
      );
    } else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Campos Incompletos',
        text: 'Por favor llena todos los campos correctamente',
        showConfirmButton: true
      });
    }
  }

  guardarCentroFormacion(centroFormacion: CentroFormacion) {
    if (this.centroFormacionForm.valid) {
      this._centroFormacionService.registrarCentroFormacion(centroFormacion).subscribe((data: any) => {
        console.log('response', data);
        if (data.status === 'success') {
          // Show success message with Swal alert
          Swal.fire({
            icon: 'success',
            title: 'El centro de formación fue registrado con éxito',
            showConfirmButton: true
          });
          this.route.navigate(['/listaCentroFormacion']);
        } else {
          // Handle registration errors (e.g., already exists)
          Swal.fire({
            title: 'Error',
            text: 'El centro de formación ya está registrado',
            icon: 'error',
            showConfirmButton: true
          });
        }
      }, error => {
        this.centroFormacionForm.reset();
      });
    } else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Campos Incompletos',
        text: 'Por favor llena todos los campos correctamente 1',
        showConfirmButton: true
      });
    }
  }


  getCentroFormacion() {
    console.log('centro id', this.id);
    if (this.id !== null) {
      this.titulo = 'Editar';
      this.nombreBoton = 'EDITAR';
      this._centroFormacionService.getCentroFormacion(this.id).subscribe(data => {

        console.log('data de aprendiz', data.data);
        this.centroFormacionForm.setValue({
          centro_formacion: data.data.centro_formacion,
          dir_centro_formacion: data.data.dir_centro_formacion,
          telefono_centrof: data.data.telefono_centrof,
          email_centrof: data.data.email_centrof,
          idRegional: data.data.idRegional,
          idzona: data.data.idzona,
        });
      });
      this.titulo = 'Editar ' + this.centroFormacionForm.get('centro_formacion')?.value;
    }
  }

  cancelar() {
    this.route.navigate(['/listaCentroFormacion']);
  }

  verificarEmail() {
    this.mostrarMensajeEmail = this.registroData.email_centrof && !this.validarEmail(this.registroData.email_centrof);
  }

  validarEmail(email: string): boolean {
    return email.includes('@');
  }

  verificarTelefono() {
    this.mostrarMensajeTelefono = this.registroData.telefono_centrof && !this.validarTelefono(this.registroData.telefono_centrof);
    this.caracteresTelefono = this.registroData.telefono_centrof.length > 10;
  }

  validarTelefono(telefono_centrof: string): boolean {
    const telefonoRegex = /^\d{10}$/;
    return telefonoRegex.test(telefono_centrof);
  }

  onInput(event: any, campo: string) {
    const input = event.target.value;
    if (input.length > 10) {
      if (campo === 'telefono_usuario') {
        this.caracteresTelefono = true;
        this.registroData.telefono_centrof = input.slice(0, 10);
      } else {
        if (campo === 'telefono_usuario') {
          this.caracteresTelefono = false;
        }
      }
    }
  }
}
