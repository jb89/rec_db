import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Resource } from 'src/app/shared/models/resource';
import { RecipeResource } from 'src/app/shared/models/recipe-resource';
import { BackendService } from 'src/app/shared/services/backend.service';

@Component({
  selector: 'app-read-by-quelle',
  templateUrl: './read-by-quelle.component.html',
  styleUrls: ['./read-by-quelle.component.css']
})
export class ReadByQuelleComponent implements OnInit {


  allQuellen$: Observable<Resource[]>;
  foundQuellen: Resource[];
  selectedQuelle: Resource;
  rezepteForQuelle: RecipeResource[];

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.allQuellen$ = this.backendService.getQuellen();
    this.allQuellen$.subscribe(z => {
      this.foundQuellen = z;
    });
  }

  selection(event: any): void {
    const qu = event.detail.item.value;
    this.selectedQuelle = this.foundQuellen.find(q => q.name === qu);
    this.backendService.getRezepteForQuelle(this.selectedQuelle).subscribe(rezepte => {
      this.rezepteForQuelle = rezepte;
    })
  }

}
