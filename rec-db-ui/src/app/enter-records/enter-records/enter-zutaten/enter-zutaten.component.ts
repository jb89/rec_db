import { Component, Input, OnInit } from '@angular/core';
import { Resource } from 'src/app/shared/models/resource';

@Component({
  selector: 'app-enter-zutaten',
  templateUrl: './enter-zutaten.component.html',
  styleUrls: ['./enter-zutaten.component.css']
})
export class EnterZutatenComponent implements OnInit {

  @Input() quelle: Resource;

  constructor() { }

  ngOnInit(): void {
  }

}
