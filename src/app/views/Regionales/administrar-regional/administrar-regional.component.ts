import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegionalService } from '../../../services/regional/regional.service';

@Component({
  selector: 'app-administrar-regional',
  templateUrl: './administrar-regional.component.html',
  styleUrls: ['./administrar-regional.component.css']
})
export class AdministrarRegionalComponent implements OnInit {
  regionalForm: FormGroup;
  errorMessage: string = '';
  regionales: AdministrarRegionalComponent[] = [];

  constructor(private formBuilder: FormBuilder, private regionalService: RegionalService) { }

  ngOnInit(): void {
    this.regionalForm = this.formBuilder.group({
      nombreRegional: ['', Validators.required],
      direccion: ['', Validators.required]

  });
  this.listarRegionales(); // Llama al método para listar regionales al inicializar el componente
}
listarRegionales(): void {
  this.regionalService.getAllRegionals().subscribe(
    data => {
      this.regionales = [];
    },
    error => {
      console.error('Error al obtener las regionales:', error);
      this.errorMessage = 'Error al obtener las regionales. Por favor, inténtalo de nuevo más tarde.';
    }
  );
}



}
