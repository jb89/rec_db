import { BackendService } from 'src/app/shared/services/backend.service';
import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/models/ingredient';
import { Observable } from 'rxjs';
import { RecipeResourcesByResource } from 'src/app/shared/models/recipe-resources-by-resource';

@Component({
  selector: 'app-read-by-zutat',
  templateUrl: './read-by-zutat.component.html',
  styleUrls: ['./read-by-zutat.component.css']
})
export class ReadByZutatComponent implements OnInit {

  allIngredients$: Observable<Ingredient[]>;
  foundIngredients: Ingredient[];
  selectedIngredient: Ingredient;
  rrByResource: RecipeResourcesByResource[];

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.allIngredients$ = this.backendService.getZutaten();
    this.allIngredients$.subscribe(z => {
      this.foundIngredients = z;
    });
  }

  selection(event: any): void {
    const zut = event.detail.item.value;
    this.selectedIngredient = this.foundIngredients.find(z => z.name === zut);
    this.backendService.getRezepteWithQuelleForZutat(this.selectedIngredient.name).subscribe(rezepteForQuelle => {
      this.rrByResource = rezepteForQuelle;
    });
  }

}
