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

  

  constructor() { }

  ngOnInit(): void {
  }

}
