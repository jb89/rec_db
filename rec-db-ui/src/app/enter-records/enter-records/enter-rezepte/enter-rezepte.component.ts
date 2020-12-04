import { RezeptCreationState } from './rezept-creation-state.enum';
import { BackendService } from './../../../shared/services/backend.service';
import { Component, Input, OnInit } from '@angular/core';
import { Resource } from 'src/app/shared/models/resource';
import { Ingredient } from 'src/app/shared/models/ingredient';
import { throwError } from 'rxjs';
import { RecipeResource } from 'src/app/shared/models/recipe-resource';
import { Recipe } from 'src/app/shared/models/recipe';

@Component({
  selector: 'app-enter-rezepte',
  templateUrl: './enter-rezepte.component.html',
  styleUrls: ['./enter-rezepte.component.css']
})
export class EnterRezepteComponent implements OnInit {

  @Input() quelle: Resource;

  allZutaten: Ingredient[];
  allZutatenNames: string[];
  zutatNameInput = '';
  needNewZutat = false;
  zutatCreationEnabled = false;
  chosenZutat: Ingredient;
  zutatChosen = false;

  preSetRezepte: RecipeResource[];
  allRezepte: Recipe[];
  allRezepteNames: string[];
  rezeptNameInput: string;
  rezeptStelleInput: string;
  doubleRezeptInput = false;

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
      this.zutatCreationEnabled = false;
      this.needNewZutat = false;
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
    this.backendService.getRezepteForQuelleAndZutat(this.quelle.name, this.chosenZutat.name).subscribe(rezepte => {
      this.preSetRezepte = rezepte;
      this.backendService.getRezepte().subscribe(rezepteAll => {
        this.allRezepte = rezepteAll;
        this.allRezepteNames = rezepteAll//
          .map(r => r.name)//
          .filter(rn => !this.preSetRezepte.find(r => r.recipe.name === rn));
      });
      console.log('found rezepte: ', rezepte);
    });
  }

  changeZutat(event: any): void {
    this.zutatChosen = false;
    this.chosenZutat = undefined;
    this.zutatNameInput = '';
  }

  isRezeptCreationReady(): boolean {
    return this.rezeptCreationState === RezeptCreationState.ready;
  }

  isRezeptCreationOngoing(): boolean {
    return this.rezeptCreationState === RezeptCreationState.ongoing;
  }

  activateRezeptCreation(): void {
    this.rezeptNameInput = undefined;
    this.rezeptStelleInput = undefined;
    this.rezeptCreationState = RezeptCreationState.ongoing;
  }

  setRezept(r: string): void {
    this.rezeptNameInput = r;
  }

  setRezeptStelle(s: string): void {
    this.rezeptStelleInput = s;
  }

  addNewRezeptAndSetRelation(): void {
    this.doubleRezeptInput = false;
    if (!this.rezeptNameInput || !this.rezeptStelleInput) {
      console.error('Rezept- or Stelle-Input can not be undefined or empty at this point');
    } else {
      if (this.preSetRezepte.find(r => r.recipe.name === this.rezeptNameInput)) {
        this.doubleRezeptInput = true;
        return;
      }
      this.backendService.createRezept(this.rezeptNameInput).subscribe(rezept => {
        this.backendService.setRezeptForQuelleAndZutat(rezept, this.quelle, this.chosenZutat, this.rezeptStelleInput)
          .subscribe(recipeResource => {
            this.preSetRezepte.push(recipeResource);
            this.preSetRezepte = this.preSetRezepte.slice();
            this.endRezeptCreation();
          });
      });
    }
  }

  endRezeptCreation(): void {
    this.rezeptCreationState = RezeptCreationState.ready;
  }

}
