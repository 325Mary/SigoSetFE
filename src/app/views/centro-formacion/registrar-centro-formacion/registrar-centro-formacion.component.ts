import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {CentroFormacion} from 'app/models/centro-formacion/centro-formacion'
import { CentroFormacionService}from 'app/services/centro-formacion/centro-formacion.service'
import { ZonaService }from 'app/services/zona/zona.service'
import { RegionalService } from 'app/services/regional/regional.service';
import { AdministrarRegionalComponent } from 'app/views/Regionales/administrar-regional/administrar-regional.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-registrar-centro-formacion',
  templateUrl: './registrar-centro-formacion.component.html',
  styleUrls: ['./registrar-centro-formacion.component.css']
})
export class RegistrarCentroFormacionComponent implements OnInit {
  nombreBoton = 'REGISTRAR';
  titulo = 'Registrar Centro De Formacion';
  cambiarFormulario = 0;
  id: string | null;
  centroFormacionForm: FormGroup;
  datosFormulario: any
  listaRegionales: any[] = [];
  listaZonas: any[] = [];
  submitted: boolean = false;



   constructor(private fb: FormBuilder,
    private route: Router,
    private aRoute: ActivatedRoute ,
    private _zonaService: ZonaService,
    private _regionalService: RegionalService,
    private _centroFormacionService: CentroFormacionService,
   
    ) {
    this.centroFormacionForm = this.fb.group({
      centro_formacion:  ['', Validators.required],
      dir_centro_formacion:  ['', Validators.required],
      telefono_centrof: ['', Validators.required],
      email_centrof:  ['', Validators.required],
      // ordenador_gasto: ['', Validators.required],
      // telefono_ordenadorg: ['', Validators.required],
      // email_ordenadorg:  ['', Validators.required],
      idRegional: ['', Validators.required],
      idzona: ['', Validators.required],
    })

    this.id = this.aRoute.snapshot.paramMap.get('id')
    console.log('centro id' , this.id)
  }

  ngOnInit(): void {
    this.getlistaZonas()
    this.getListaRegionales()
    this.getCentroFormacion()
  }
  changeNextForm() {
    this.cambiarFormulario = 1
  }
  changeForm2() {
    this.cambiarFormulario = 0
  }
  guardarOActualizaCentroFormacion() {
    // Obtener los datos del formulario
 
    const centroFormacion: CentroFormacion = {
      centro_formacion:this.centroFormacionForm.get('centro_formacion')?.value,
      dir_centro_formacion:this.centroFormacionForm.get('dir_centro_formacion')?.value,
      telefono_centrof:this.centroFormacionForm.get('telefono_centrof')?.value,
      email_centrof:this.centroFormacionForm.get('email_centrof')?.value,
      // ordenador_gasto:this.centroFormacionForm.get('ordenador_gasto')?.value,
      // telefono_ordenadorg:this.centroFormacionForm.get('telefono_ordenadorg')?.value,
      // email_ordenadorg:this.centroFormacionForm.get('email_ordenadorg')?.value,
      idRegional:this.centroFormacionForm.get('idRegional')?.value,
      idzona:this.centroFormacionForm.get('idzona')?.value,
    
    };
  
    if (this.id !== null) {
      // Editar un  centro de formación  existente
      this.editarCentroFormacion(centroFormacion);
    } else {
      // Guardar un nuevo  centro de formación 
      console.log('centro', centroFormacion)
      this.guardarCentroFormacion(centroFormacion);
    }
  }
  
  editarCentroFormacion(centroFormacion: CentroFormacion) {
    if (this.centroFormacionForm.valid) {
      this._centroFormacionService.editarCentroFormacion(this.id, centroFormacion).subscribe((data: any) => {
        if (data.status == 'success') {
          Swal.fire({
            title: 'Centro De Formación Actualizado',
            text: 'Los datos del centro de formación fueron actualizados correctamente',
            icon: 'success',
            showConfirmButton: true,
          });
        }
        this.route.navigate(['/listaCentroFormacion']);
      });
    } else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Campos Incompletos',
        text: 'Por favor llena todos los campos correctamente ed',
        showConfirmButton: true,
      });
    }
  }
  
  guardarCentroFormacion(centroFormacion: CentroFormacion) {
    if (this.centroFormacionForm.valid) {
      this._centroFormacionService.registrarCentroFormacion(centroFormacion).subscribe((data: any) => {
        console.log('response', data)
        if (data.status == 'success') {
          Swal.fire({
            icon: 'success',
            title: 'El  centro de formación  fue registrado con éxito',
            showConfirmButton: true,
          });
          
          this.route.navigate(['/listaCentroFormacion']);
        } else {
          Swal.fire({
            title: 'Error',
            text: 'El  ya está registrado',
            icon: 'error',
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
        showConfirmButton: true,
      });
    }
  }
  getlistaZonas () {
    this._zonaService.getZona().subscribe(data => {
      this.listaZonas = data.data;
      console.log(this.listaZonas)
    }, error => {

    })
  }
  getListaRegionales(): void {
    this._regionalService.getAllRegionals()
      .subscribe(
        (result: AdministrarRegionalComponent[]) => {
          this.listaRegionales = result;
          this.listaRegionales = this.listaRegionales[0]
          console.log('listaRegionales obtenidos:', this.listaRegionales);
        },
        (error: any) => {
          console.error('Error al obtener los listaRegionales:', error);
        }
      );
  }
  getCentroFormacion (){
    console.log('centro id' , this.id)
    if(this.id !== null){
      this.titulo = 'Editar';
      this.nombreBoton = 'EDITAR';
      this._centroFormacionService.getCentroFormacion(this.id).subscribe( data => {
       
        console.log('data de aprendiz',data.data);
        this.centroFormacionForm.setValue( {
          centro_formacion:data.data.centro_formacion,
          dir_centro_formacion:data.data.dir_centro_formacion,
          telefono_centrof:data.data.telefono_centrof,
          email_centrof:data.data.email_centrof,
          // ordenador_gasto:data.data.ordenador_gasto,
          // telefono_ordenadorg:data.data.telefono_ordenadorg,
          // email_ordenadorg:data.data.email_ordenadorg,
          idRegional:data.data.idRegional,
          idzona:data.data.idzona,
        
        });
      })
      this.titulo = 'Editar ' + this.centroFormacionForm.get('centro_formacion')?.value;

    }
    }

}
