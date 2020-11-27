import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Quelle } from 'src/app/shared/models/quelle';
import { RezeptStelle } from 'src/app/shared/models/rezept-stelle';
import { RezepteForQuelle } from 'src/app/shared/models/rezepte-for-quelle';
import { Zutat } from 'src/app/shared/models/zutat';
import { BackendService } from 'src/app/shared/services/backend.service';

@Component({
  selector: 'app-read-by-quelle',
  templateUrl: './read-by-quelle.component.html',
  styleUrls: ['./read-by-quelle.component.css']
})
export class ReadByQuelleComponent implements OnInit {


  allQuellen$: Observable<Quelle[]>;
  foundQuellen: Quelle[];
  selectedQuelle: Quelle;
  rezepteForQuelle: RezeptStelle[];

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
    this.backendService.getRezepteForQuelle(this.selectedQuelle.id).subscribe(rezepte => {
      this.rezepteForQuelle = rezepte;
    })
  }

}
