import { RecipeResource } from './../../../shared/models/recipe-resource';
import { BackendService } from 'src/app/shared/services/backend.service';
import { EnterStatus } from './model/enter-status.enum';
import { Component, Input, OnInit } from '@angular/core';
import { AmbiguousPosition } from 'src/app/enter-records/enter-records/enter-bulk/model/ambiguous-position';
import { Resource } from 'src/app/shared/models/resource';
import { RecipePosition } from './model/recipe-position';


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
    if (completeString.endsWith(';')) {
      this.errorText = 'Am ende darf kein \';\' stehen';
      return;
    }
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
        this.status = EnterStatus.CLEANUP_AMBIGUOUS;
      }
    }

    if (this.ambiguousStellen.length === 0) {
      // TODO Automatically create RecipeResources. Or let user push button
      // this.createRecipeResources(this.rezepte);
    }
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