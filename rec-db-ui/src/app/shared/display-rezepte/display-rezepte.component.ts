import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RecipeResource } from '../models/recipe-resource';

@Component({
  selector: 'app-display-rezepte',
  templateUrl: './display-rezepte.component.html',
  styleUrls: ['./display-rezepte.component.css']
})
export class DisplayRezepteComponent implements OnInit, OnChanges {

  @Input() rezepte: RecipeResource[];
  displayedRezepteColumns: string[] = ['rezeptName', 'stelle'];

  constructor(private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.changeDetectorRefs.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.rezepte = changes.rezepte.currentValue;
    this.changeDetectorRefs.detectChanges();
  }

}
