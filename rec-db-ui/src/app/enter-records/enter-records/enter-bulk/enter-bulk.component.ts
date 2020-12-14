import { RecipeResource } from './../../../shared/models/recipe-resource';
import { BackendService } from 'src/app/shared/services/backend.service';
import { EnterStatus } from './model/enter-status.enum';
import { Component, Input, OnInit } from '@angular/core';
import { AmbiguousPosition } from 'src/app/enter-records/enter-records/enter-bulk/model/ambiguous-position';
import { Resource } from 'src/app/shared/models/resource';
import { RecipePosition } from './model/recipe-position';
import { IngredientPositions } from './model/ingredient-positions';


@Component({
  selector: 'app-enter-bulk',
  templateUrl: './enter-bulk.component.html',
  styleUrls: ['./enter-bulk.component.css']
})
export class EnterBulkComponent implements OnInit {

  @Input() quelle: Resource;
  errorText: string;
  rezepte: RecipePosition[];
  ambiguousStellen: AmbiguousPosition[];
  status: EnterStatus;
  allStatuses = EnterStatus;
  recipeResourcesBackend: RecipeResource[];
  
  ingredientPositions: IngredientPositions[];

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.quelle = new Resource('Die Küche', 'Tim Mälzer');
    this.rezepte = [];
    this.ambiguousStellen = [];
    this.status = EnterStatus.INIT;
  }

  inputRezepte(event: any): void {
    this.reset();
    const completeString = event.target.value.trim();
    if (!this._checkInputEnding(completeString)) { return; }
    const rezepteArr = completeString.split(';');
    for (const rezeptStr of rezepteArr) {
      if (rezeptStr.indexOf('#') !== -1) {
        const rezeptArr = rezeptStr.split('#');
        const rezeptName: string = rezeptArr[0];
        const rezeptStelle: string = rezeptArr[1];
        if (rezeptName.length > 0 && rezeptStelle.length > 0) {
          const r = {
            name: rezeptArr[0],
            position: rezeptArr[1]
          };
          this.rezepte.push(r);
        } else {
          console.error(`Parse error! Either Recipe-Name (${rezeptName}) or Recipe-Position (${rezeptStelle}) could not be parsed.`);
        }
      }
    }
    if (this.rezepte.length < 1) {
      this.errorText = 'Es konnte nichts geparsed werden';
      return;
    }

    const grouped = groupBy(this.rezepte, r => r.position);
    for (const group of grouped) {
      if (group[1].length > 1) {
        const stelle = new AmbiguousPosition(group[0], group[1]);
        this.ambiguousStellen.push(stelle);
        this.status = EnterStatus.RECIPES_CLEANUP_AMBIGUOUS;
      }
    }

    if (this.ambiguousStellen.length === 0) {
      // TODO Automatically create RecipeResources. Or let user push button
      this.createRecipeResources(this.rezepte);
    }
  }

  inputIngredients(event: any): void {
    this.ingredientPositions = [];
    const completeString = event.target.value.trim();
    if (!this._checkInputEnding(completeString)) { return; }
    const ingredientsArr = completeString.split(';');
    for (const ingredientStr of ingredientsArr) {
      if (ingredientStr.indexOf('#') !== -1) {
        const ingredientArr = ingredientStr.split('#');
        const ingName: string = ingredientArr[0];
        const ingStellenStr: string = ingredientArr[1].trim().replace(/ /g, '');
        const ingStellenArr: string[] = ingStellenStr.split(',');
        ingStellenArr.forEach(s => s = s.trim());
        if (ingName.length > 0 && ingStellenStr.length > 0) {
          const i = {
            name: ingName,
            positions: ingStellenArr
          };
          this.ingredientPositions.push(i);
        } else {
          console.error(`Parse error! Either Ingredient-Name (${ingName}) or Ingredient-Position (${ingStellenStr}) could not be parsed.`);
        }
      }
    }
  }

  sendIngredients(): void {
    this.backendService.putIngredientsToPositionsAtResource(this.quelle, this.ingredientPositions).subscribe(resp => {
      this.status = EnterStatus.FINISHED;
    });
  }

  receiveCleanedPositions(deletedPositions: RecipePosition[]): void {
    const cleanedRecipes = this.rezepte.filter(recipe => !deletedPositions.includes(recipe));
    this.createRecipeResources(cleanedRecipes);
  }

  createRecipeResources(data: RecipePosition[]): void {
    this.backendService.putRecipesToResource(this.quelle, data).subscribe(createdRecipeResources => {
      this.recipeResourcesBackend = createdRecipeResources;
      this.status = EnterStatus.RECIPES_CREATED;
    });
  }

  reset(): void {
    this.errorText = '';
    this.rezepte = [];
    this.ambiguousStellen = [];
  }

  private _checkInputEnding(input: string): boolean {
    if (input.endsWith(';')) {
      this.errorText = 'Am ende darf kein \';\' stehen';
      return false;
    } else {
      return true;
    }
  }

}

function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}


