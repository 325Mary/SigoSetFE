import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegionalService } from '../../../services/regional/regional.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-regional',
  templateUrl: './crear-regional.component.html',
  styleUrls: ['./crear-regional.component.css']
})
export class CrearRegionalComponent implements OnInit {
  regionalForm: FormGroup;
  errorMessage: string = '';
  regionales: CrearRegionalComponent[]

  constructor(private formBuilder: FormBuilder, private regionalService: RegionalService,private router: Router) { }

  ngOnInit(): void {
    this.regionalForm = this.formBuilder.group({
      id_regional: [null],
      regional: ['', Validators.required],
      direccion: ['', Validators.required]

  });
}
  createRegional(): void {
    if (this.regionalForm.valid) {
      const nuevaRegional = this.regionalForm.value;
      this.regionalService.createRegional(nuevaRegional).subscribe(
        response => {
          Swal.fire({
            title:"! Hecho ¡",
            text:"Regional creada con Exito",
            icon:"success",
            timer:3000
          }).then((response)=>{
            if(response.isConfirmed){
              this.router.navigate(['list-regional'])
            }
          })
        },
        error => {
          Swal.fire({
            title:"! Error ¡",
            text:"No se pudo crear la regional",
            icon:"warning"
          })
        }
      );
    } else {
      Swal.fire({
        title:"!Oye¡",
        text:"Ingresa datos primero",
        icon:"info"
      })
    }
  }

}
