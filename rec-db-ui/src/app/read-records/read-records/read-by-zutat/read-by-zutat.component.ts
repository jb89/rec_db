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

  allZutaten$: Observable<Ingredient[]>;
  foundZutaten: Ingredient[];
  selectedZutat: Ingredient;
  rezepteForQuelle: RecipeResourcesByResource[];

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.allZutaten$ = this.backendService.getZutaten();
    this.allZutaten$.subscribe(z => {
      this.foundZutaten = z;
    });
  }

  selection(event: any): void {
    const zut = event.detail.item.value;
    this.selectedZutat = this.foundZutaten.find(z => z.name === zut);
    this.backendService.getRezepteWithQuelleForZutat(this.selectedZutat.name).subscribe(rezepteForQuelle => {
      this.rezepteForQuelle = rezepteForQuelle;
    });
  }

}
