import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RecipeResource } from '../models/recipe-resource';

@Component({
  selector: 'app-display-rezepte',
  templateUrl: './display-rezepte.component.html',
  styleUrls: ['./display-rezepte.component.css']
})
export class DisplayRezepteComponent implements OnInit, OnChanges {

  @Input() recipeResources: RecipeResource[];

  constructor(private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.changeDetectorRefs.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.recipeResources = changes.recipeResources.currentValue;
    this.changeDetectorRefs.detectChanges();
  }

}
