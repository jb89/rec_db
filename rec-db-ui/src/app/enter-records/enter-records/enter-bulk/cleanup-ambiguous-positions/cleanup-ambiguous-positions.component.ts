import { AmbiguousPosition } from 'src/app/enter-records/enter-records/enter-bulk/model/ambiguous-position';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RecipePosition } from '../model/recipe-position';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-cleanup-ambiguous-positions',
  templateUrl: './cleanup-ambiguous-positions.component.html',
  styleUrls: ['./cleanup-ambiguous-positions.component.css']
})
export class CleanupAmbiguousPositionsComponent implements OnInit {

  @Input() positions: AmbiguousPosition[];
  positionsToBeDeleted: RecipePosition[];
  @Output() emitDeletions = new EventEmitter<RecipePosition[]>();
  
  constructor() {
    this.positionsToBeDeleted = [];
  }

  ngOnInit(): void {
  }

  deleteRecipe(rp: RecipePosition): void {
    console.log(`wir senden nicht mit: ${rp.name} von stelle ${rp.position}`);
    this.positionsToBeDeleted.push(rp);
  }

  restoreRecipe(rp: RecipePosition): void {
    const delPos = this.positionsToBeDeleted.splice(this.positionsToBeDeleted.indexOf(rp), 1);
    console.log('restored recipe ', delPos);
  }

  finalize(): void {
    this.emitDeletions.emit(this.positionsToBeDeleted);
  }

  isRecipeDeleted(rp: RecipePosition): boolean {
    return this.positionsToBeDeleted.find(deleted => deleted.name === rp.name) !== undefined;
  }


}
