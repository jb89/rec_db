import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { EnterRecordsModule } from './enter-records/enter-records/enter-records.module';
import { ReadRecordsModule } from './read-records/read-records/read-records.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MatTabsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    EnterRecordsModule,
    ReadRecordsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
