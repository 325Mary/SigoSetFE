import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {CentroFormacion} from 'app/models/centro-formacion/centro-formacion'
import {Zona} from 'app/models/zona/zona'
import { CentroFormacionService}from 'app/services/centro-formacion/centro-formacion.service'
import { ZonaService }from 'app/services/zona/zona.service'
import { RegionalService } from 'app/services/regional/regional.service';
import { AdministrarRegionalComponent } from 'app/views/Regionales/administrar-regional/administrar-regional.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-centro-formacion',
  templateUrl: './detalle-centro-formacion.component.html',
  styleUrls: ['./detalle-centro-formacion.component.css']
})
export class DetalleCentroFormacionComponent implements OnInit {
  id: string | null;
  centroFormacion: CentroFormacion
  regional: AdministrarRegionalComponent;
  zona: Zona
  constructor(
    private route: Router,
    private aRoute: ActivatedRoute ,
    private _zonaService: ZonaService,
    private _regionalService: RegionalService,
    private _centroFormacionService: CentroFormacionService,
   
    ) {
   
    this.id = this.aRoute.snapshot.paramMap.get('id')
    console.log('centro id' , this.id)
  }

  ngOnInit(): void {
    this.getCentroFormacion()
  }
  getZona (id: number) {
    //Cambiar depronto añadir cantidad en el .getzona()
    this._zonaService.getZona().subscribe(data => {
      this.zona = data.data;
      console.log('zona')
      console.log(this.zona.Nombre_zona)
      return this.zona.Nombre_zona
    }, error => {

    })
  }
  getRegional(regionalId:number): void {
    // Aquí proporciona el ID deseado o recupéralo de algún lugar
    this._regionalService.getRegionalById(regionalId).subscribe(
      (regional: AdministrarRegionalComponent) => {
        this.regional = regional[0]
        console.log(regional); // Puedes hacer algo con los datos recibidos, como asignarlos a una variable o mostrarlos en el HTML
       
      },
      (error) => {
        console.log(error); // Manejo de errores si la solicitud falla
      }
    );
  }
  getCentroFormacion (){
    console.log('centro id' , this.id)
    if(this.id !== null){
      this._centroFormacionService.getCentroFormacion(this.id).subscribe( data => {
        console.log('data de aprendiz',data.data);
        this.centroFormacion = data.data
        this.centroFormacion.idRegional=this.getRegional(this.centroFormacion.idRegional)
        this.centroFormacion.idzona=this.getZona(this.centroFormacion.idzona)
      
      })
      
    }
    }
}
