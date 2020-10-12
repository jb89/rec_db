import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Quelle } from 'src/app/shared/models/quelle';
import { BackendService } from 'src/app/shared/services/backend.service';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.css']
})
export class InputAutocompleteComponent implements OnInit {

  formControl = new FormControl();
  filteredEntries: Observable<string[]>;

  @Input() allEntries: string[];
  @Output() chosenEntry = new EventEmitter();
  input = '';

  constructor() { }

  ngOnInit(): void {
    this.filteredEntries = this.formControl.valueChanges
    .pipe(
      startWith(''),
      map(value => {
        this.input = value;
        return this._filterEntry(value);
      })
    );
  }

  private _filterEntry(value: string): string[] {
    const filtered: string[] = this.allEntries.filter(entry => entry.toLowerCase().includes(value.toLowerCase()));
    if (filtered.length < 2) {
      this._emitEntry(value);
    } else {
      this._emitEntry(undefined);
    }
    return filtered;
  }

  private _emitEntry(value: string): void {
    this.chosenEntry.emit(value);
  }

}
