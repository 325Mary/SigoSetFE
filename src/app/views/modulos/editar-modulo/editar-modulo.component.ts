import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModuloService } from '../../../services/modulos/modulos.service';


@Component({
  selector: 'app-editar-modulo',
  templateUrl: './editar-modulo.component.html',
  styleUrls: ['./editar-modulo.component.css']
})
export class EditarModuloComponent implements OnInit {

  moduloForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private moduloService: ModuloService,
    public dialogRef: MatDialogRef<EditarModuloComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
  }

  ngOnInit(): void {
    this.moduloForm = this.fb.group({
      // idmodulo: [data.modulo.idmodulo],
      modulo: ["", Validators.required],
      url_modulo: ["", Validators.required],
      icono: ["",Validators.required],
      orden: [0, Validators.required]
    });
      
  }

  onSubmit() {
    if (this.moduloForm.valid) {
      this.moduloService.actualizarModulo(this.moduloForm.value).subscribe(
        () => {
          this.dialogRef.close(this.moduloForm.value);
        },
        error => {
          console.error('Error al actualizar el módulo', error);
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}