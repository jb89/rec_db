import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { EnterRecordsModule } from './enter-records/enter-records/enter-records.module';
import { ReadRecordsModule } from './read-records/read-records/read-records.module';
import { DisplayRezepteComponent } from './shared/display-rezepte/display-rezepte.component';
import { SharedModule } from './shared/shared.module';


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
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
