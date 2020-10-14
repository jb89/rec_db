import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.css']
})
export class InputAutocompleteComponent implements OnInit {
  @Input() allEntries: string[];
  @Input() placeholder: string;
  @Input() mandatory: boolean;
  @Input() disabled?: boolean;
  @Output() chosenEntry = new EventEmitter();

  formControl = new FormControl();
  filteredEntriesObs: Observable<string[]>;
  inputOk: boolean;

  input = '';

  constructor() { }

  ngOnInit(): void {
    if (this.disabled) {
      this._disableInput();
    } else {

      this.filteredEntriesObs = this.formControl.valueChanges
        .pipe(
          startWith(''),
          map(value => {
            this.input = value;
            return this._filterEntry(value);
          })
        );
    }

    this.mandatory ? this.inputOk = false : this.inputOk = true;

  }

  private _filterEntry(value: string): string[] {
    if (this.allEntries) {
      return this.allEntries.filter(entry => entry.toLowerCase().includes(value.toLowerCase()));
    } else {
      return [];
    }
    
  }

  /**
   * When focusing out of inputfield, this method emits value
   */
  focusOut(): void {
    if (this.input.length > 0) {
      this.inputOk = true;
      this.chosenEntry.emit(this.input);
    } else {
      if (this.mandatory) {
        this.inputOk = false;
      }
      this.chosenEntry.emit(undefined);
    }
  }

  private _disableInput(): void {
    this.formControl.disable();
  }
}
