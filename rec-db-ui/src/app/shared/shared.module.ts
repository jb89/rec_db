import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayRezepteComponent } from './display-rezepte/display-rezepte.component';

@NgModule({
  declarations: [DisplayRezepteComponent],
  imports: [
    CommonModule
  ],
  exports: [DisplayRezepteComponent]
})
export class SharedModule { }
