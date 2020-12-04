import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { Resource } from 'src/app/shared/models/resource';
import { BackendService } from 'src/app/shared/services/backend.service';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-enter-quelle',
  templateUrl: './enter-quelle.component.html',
  styleUrls: ['./enter-quelle.component.css']
})
export class EnterQuelleComponent implements OnInit {
  
  quellen: Resource[] = [];
  quellenNames: string[];
  quelleNameInput = '';
  needNewQuelle = false;
  quelleCreationEnabled = false;
  quelleCreationPossible = false;

  quellenAutoren: string[];
  quelleAutorFormControl = new FormControl();
  quelleAutorInput = '';
  quelleChosen = false;

  @Output() chosenQuelle = new EventEmitter<Resource>();

  constructor(private backendService: BackendService) {
  }

  ngOnInit(): void {
    this.backendService.getQuellen().subscribe(quellen => {
      this.quellenNames = quellen.map(q => q.name);
      const allAutoren = quellen.map(q => q.author);
      this.quellenAutoren = allAutoren.filter((name, i) => allAutoren.indexOf(name) === i);
      this.quellen = quellen;
    });

    this.quelleAutorFormControl.valueChanges.subscribe(value => this.quelleAutorInput = value);
  }

  /**
   * Input-Child-Componet either sends undefined or single value of chosen Quelle. This method decides,
   * if we have to create a new Quelle or not.
   * @param quelle quelle from Child-Component.
   */
  setQuelle(quelle: string): void {
    this.quelleNameInput = quelle;
    if (quelle === undefined) {
      this.abortQuelleCreation();
      this.needNewQuelle = false;
    } else {
      this.needNewQuelle = this.quellenNames.includes(quelle) ? false : true;
    }
    console.log(`New Quelle=${quelle}, needs new creation? ${this.needNewQuelle}`);
  }

  setQuelleCreationAutor(autor: string): void {
    this.quelleAutorInput = autor;
    if (autor !== undefined) {
      this.quelleCreationPossible = true;
    } else {
      this.quelleCreationPossible = false;
    }
  }

  activateQuelleCreation(event: any): void {
    this.quelleCreationEnabled = true;
  }

  addNewQuelle(event: any): void {
    this.backendService.createQuelle(this.quelleNameInput, this.quelleAutorInput).subscribe(createdObj => {
      this._emitQuelle(createdObj);
    });
  }

  abortQuelleCreation(): void {
    this.quelleCreationEnabled = false;
  }

  finalizeSettingQuelle(): void {
    this.quelleChosen = true;
    const chosenQuelle = this.quellen.find(q => q.name === this.quelleNameInput);
    if (chosenQuelle === undefined) {
      throwError('Error: Chosen Quelle can not be undefined!');
    }
    this._emitQuelle(chosenQuelle);
  }

  private _emitQuelle(quelle: Resource) {
    this.chosenQuelle.emit(quelle);
  }

}
