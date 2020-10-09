import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadRecordsComponent } from './read-records/read-records.component';



@NgModule({
  declarations: [ReadRecordsComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ReadRecordsComponent
  ]
})
export class ReadRecordsModule { }
