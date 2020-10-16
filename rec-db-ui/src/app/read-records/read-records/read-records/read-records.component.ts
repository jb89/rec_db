import { BackendService } from 'src/app/shared/services/backend.service';
import { Component, OnInit } from '@angular/core';
import { Zutat } from 'src/app/shared/models/zutat';
import { Observable } from 'rxjs';
import { RezepteForQuelle } from 'src/app/shared/models/rezepte-for-quelle';

@Component({
  selector: 'app-read-records',
  templateUrl: './read-records.component.html',
  styleUrls: ['./read-records.component.css']
})
export class ReadRecordsComponent implements OnInit {

  allZutaten$: Observable<Zutat[]>;
  foundZutaten: Zutat[];
  selectedZutat: Zutat;
  rezepteForQuelle: RezepteForQuelle[];

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
    this.backendService.getRezepteWithQuelleForZutat(this.selectedZutat.id).subscribe(rezepteForQuelle => {
      this.rezepteForQuelle = rezepteForQuelle;
    });
  }

}
