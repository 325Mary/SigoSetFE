// shared.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputValidationComponent } from './components/input-validation/input-validation/input-validation.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    InputValidationComponent
    // Otros componentes, pipes, directivas, etc.
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule 
  ],
  exports: [
    InputValidationComponent
    // Otros componentes, pipes, directivas, etc. que quieras exportar
  ]
})
export class SharedModule { }
