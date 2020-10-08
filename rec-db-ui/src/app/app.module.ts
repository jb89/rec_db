import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTabsModule } from '@angular/material/tabs';
import { EnterRecordsComponent } from './enter-records/enter-records.component';
import { ReadRecordsComponent } from './read-records/read-records.component';


@NgModule({
  declarations: [
    AppComponent,
    EnterRecordsComponent,
    ReadRecordsComponent
  ],
  imports: [
    MatTabsModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
