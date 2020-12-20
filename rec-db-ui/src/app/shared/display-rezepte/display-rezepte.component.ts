import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeResource } from '../models/recipe-resource';

@Component({
  selector: 'app-display-rezepte',
  templateUrl: './display-rezepte.component.html',
  styleUrls: ['./display-rezepte.component.css']
})
export class DisplayRezepteComponent implements OnInit {

  @Input() recipeResources: RecipeResource[];
  @Input() recipeResourcesObs: Observable<RecipeResource[]>;

  constructor() { }

  ngOnInit(): void {
    if(this.recipeResourcesObs) {
      this.recipeResourcesObs.subscribe(rr => {
        this.recipeResources = rr;
      });
    }
  }
}
