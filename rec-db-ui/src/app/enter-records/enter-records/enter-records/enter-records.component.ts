import { Component, OnInit } from '@angular/core';
import { Quelle } from 'src/app/shared/models/quelle';

@Component({
  selector: 'app-enter-records',
  templateUrl: './enter-records.component.html',
  styleUrls: ['./enter-records.component.css']
})
export class EnterRecordsComponent implements OnInit {

  quelle: Quelle;

  constructor() { }

  ngOnInit(): void {
  }

  setQuelle(quelle: Quelle): void {
    console.log('set quelle: ', quelle.name);
    this.quelle = quelle;
  }

}
