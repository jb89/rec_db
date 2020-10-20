import { DisplayRezepteComponent } from './../../shared/display-rezepte/display-rezepte.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { EnterZutatenComponent } from './enter-zutaten/enter-zutaten.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EnterBulkComponent } from './enter-bulk/enter-bulk.component';

@NgModule({
  declarations: [EnterRecordsComponent, InputAutocompleteComponent, EnterQuelleComponent, EnterRezepteComponent, EnterZutatenComponent, EnterBulkComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTabsModule,
    SharedModule
  ],
  exports: [EnterRecordsComponent],
  providers: [BackendService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EnterRecordsModule { }
