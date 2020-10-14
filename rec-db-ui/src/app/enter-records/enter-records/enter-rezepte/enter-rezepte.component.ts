import { RezeptCreationState } from './rezept-creation-state.enum';
import { BackendService } from './../../../shared/services/backend.service';
import { Component, Input, OnInit } from '@angular/core';
import { Quelle } from 'src/app/shared/models/quelle';
import { Zutat } from 'src/app/shared/models/zutat';
import { throwError } from 'rxjs';
import { RezeptZutatQuelle } from 'src/app/shared/models/rezept-zutat-quelle';
import { Rezept } from 'src/app/shared/models/rezept';

@Component({
  selector: 'app-enter-rezepte',
  templateUrl: './enter-rezepte.component.html',
  styleUrls: ['./enter-rezepte.component.css']
})
export class EnterRezepteComponent implements OnInit {

  @Input() quelle: Quelle;

  allZutaten: Zutat[];
  allZutatenNames: string[];
  zutatNameInput = '';
  needNewZutat = false;
  zutatCreationEnabled = false;
  chosenZutat: Zutat;
  zutatChosen = false;

  preSetRezepte: RezeptZutatQuelle[];
  displayedRezepteColumns: string[] = ['rezeptName', 'stelle'];
  allRezepte: Rezept[];
  allRezepteNames: string[];

  rezeptCreationState = RezeptCreationState.ready;

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    console.log('init for quelle: ', this.quelle.name);
    this.backendService.getZutaten().subscribe(zutaten => {
      this.allZutaten = zutaten;
      this.allZutatenNames = this.allZutaten.map(z => z.name);
    })
  }

  setZutat(z: string): void {
    this.zutatNameInput = z;
    if (z === undefined) {
      this.abortZutatCreation();
      this.needNewZutat = false;
    } else {
      this.needNewZutat = this.allZutatenNames.includes(z) ? false : true;
    }
  }

  activateZutatCreation(event: any): void {
    this.zutatCreationEnabled = true;
  }

  abortZutatCreation(): void {
    this.zutatCreationEnabled = false;
  }

  addNewZutat(event: any): void {
    this.backendService.createZutat(this.zutatNameInput).subscribe(createdObj => {
      this.chosenZutat = createdObj;
    });
  }

  finalizeSettingZutat(): void {
    if (this.chosenZutat === undefined) {
      if (!this.zutatNameInput) {
        console.error('Error: Can not set Zutat because input is either undefined or empty');
      }
      this.chosenZutat = this.allZutaten.find(z => z.name === this.zutatNameInput);
    }
    this.zutatChosen = true;
    console.log('chosen Quelle: ', this.quelle);
    console.log('chosen Zutat: ', this.chosenZutat);
    this.backendService.getRezepteForQuelleAndZutat(this.quelle.id, this.chosenZutat.id).subscribe(rezepte => {
      this.preSetRezepte = rezepte;
      this.backendService.getRezepte().subscribe(rezepte => {
        this.allRezepte = rezepte;
        this.allRezepteNames = rezepte//
          .map(r => r.name)//
          .filter(rn => !this.preSetRezepte.find(r => r.rezeptName === rn));
      });
      console.log('found rezepte: ', rezepte);
    });
  }

  isRezeptCreationReady(): boolean {
    return this.rezeptCreationState === RezeptCreationState.ready;
  }

  isRezeptCreationOngoing(): boolean {
    return this.rezeptCreationState === RezeptCreationState.ongoing;
  }

  activateRezeptCreation(): void {
    this.rezeptCreationState = RezeptCreationState.ongoing;
  }

  setRezept(r: string) {
    console.log('set rezept: ', r);
  }

}
