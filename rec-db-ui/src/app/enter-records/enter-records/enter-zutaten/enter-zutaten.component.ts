import { Component, Input, OnInit } from '@angular/core';
import { Quelle } from 'src/app/shared/models/quelle';

@Component({
  selector: 'app-enter-zutaten',
  templateUrl: './enter-zutaten.component.html',
  styleUrls: ['./enter-zutaten.component.css']
})
export class EnterZutatenComponent implements OnInit {

  @Input() quelle: Quelle;

  constructor() { }

  ngOnInit(): void {
  }

}
