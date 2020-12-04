import { Component, OnInit } from '@angular/core';
import { Resource } from 'src/app/shared/models/resource';

@Component({
  selector: 'app-enter-records',
  templateUrl: './enter-records.component.html',
  styleUrls: ['./enter-records.component.css']
})
export class EnterRecordsComponent implements OnInit {

  quelle: Resource;

  constructor() { }

  ngOnInit(): void {
  }

  setQuelle(quelle: Resource): void {
    console.log('set quelle: ', quelle.name);
    this.quelle = quelle;
  }

}
