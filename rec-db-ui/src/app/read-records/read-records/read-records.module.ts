import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadRecordsComponent } from './read-records/read-records.component';



@NgModule({
  declarations: [ReadRecordsComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ReadRecordsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReadRecordsModule { }
