import { BackendService } from 'src/app/shared/services/backend.service';
import { Component, OnInit } from '@angular/core';
import { Zutat } from 'src/app/shared/models/zutat';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-read-records',
  templateUrl: './read-records.component.html',
  styleUrls: ['./read-records.component.css']
})
export class ReadRecordsComponent implements OnInit {

  allZutaten$: Observable<Zutat[]>;
  selectedZutat: string;

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.allZutaten$ = this.backendService.getZutaten();
  }

  selection(event: any): void {
    this.selectedZutat = event.detail.item.value;
  }

}
