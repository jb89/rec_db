import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnterRecordsComponent } from './enter-records/enter-records.component';
import { BackendService } from 'src/app/shared/services/backend.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { InputAutocompleteComponent } from './input-autocomplete/input-autocomplete.component';
import { EnterQuelleComponent } from './enter-quelle/enter-quelle.component';
import { EnterRezepteComponent } from './enter-rezepte/enter-rezepte.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { EnterZutatenComponent } from './enter-zutaten/enter-zutaten.component';

@NgModule({
  declarations: [EnterRecordsComponent, InputAutocompleteComponent, EnterQuelleComponent, EnterRezepteComponent, EnterZutatenComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule
  ],
  exports: [EnterRecordsComponent],
  providers: [BackendService],
})
export class EnterRecordsModule { }
