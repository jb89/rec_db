import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayRezepteComponent } from './display-rezepte/display-rezepte.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [DisplayRezepteComponent],
  imports: [
    CommonModule,
    MatTableModule
  ],
  exports: [DisplayRezepteComponent]
})
export class SharedModule { }
