import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadRecordsComponent } from './read-records/read-records.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReadByZutatComponent } from './read-by-zutat/read-by-zutat.component';
import { ReadByQuelleComponent } from './read-by-quelle/read-by-quelle.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ReadBySearchComponent } from './read-by-search/read-by-search.component';

@NgModule({
  declarations: [ReadRecordsComponent, ReadByZutatComponent, ReadByQuelleComponent, ReadBySearchComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatTabsModule,
  ],
  exports: [
    ReadRecordsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReadRecordsModule { }
