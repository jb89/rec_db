import { Component, Input, OnInit } from '@angular/core';
import { Quelle } from 'src/app/shared/models/quelle';

@Component({
  selector: 'app-enter-bulk',
  templateUrl: './enter-bulk.component.html',
  styleUrls: ['./enter-bulk.component.css']
})
export class EnterBulkComponent implements OnInit {

  @Input() quelle: Quelle;

  constructor() { }

  ngOnInit(): void {
  }

  inputRezepte(event: any): void {
    console.log(event.detail);
  }

}
