import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadRecordsComponent } from './read-records/read-records.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReadByZutatComponent } from './read-by-zutat/read-by-zutat.component';



@NgModule({
  declarations: [ReadRecordsComponent, ReadByZutatComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ReadRecordsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReadRecordsModule { }
