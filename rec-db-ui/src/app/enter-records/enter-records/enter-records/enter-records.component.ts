import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Quelle } from 'src/app/shared/models/quelle';
import { BackendService } from 'src/app/shared/services/backend.service';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-enter-records',
  templateUrl: './enter-records.component.html',
  styleUrls: ['./enter-records.component.css']
})
export class EnterRecordsComponent implements OnInit {

  quellen: Quelle[];
  filteredQuellen: Observable<Quelle[]>;
  quellenFormControl = new FormControl();
  needNewQuelle = false;
  activationQuelleCreationEnabled = false;

  constructor(private backendService: BackendService) {
    this.quellen = [new Quelle('q1', 'a1'), new Quelle('q2', 'a2')];
  }

  ngOnInit(): void {
    this.filteredQuellen = this.quellenFormControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterQuellen(value))
      );

    /*this.backendService.getQuellen(`all`).subscribe(data => {
      this.quellen = data;
    });
    */
    this.filteredQuellen.subscribe(filteredQuellen => {
      if (filteredQuellen.length === 0) {
        this.needNewQuelle = true;
      } else {
        this.needNewQuelle = false;
      }
    })

  }

  private _filterQuellen(value: string): Quelle[] {
    console.log('value changed: ' + value);
    const filterValue = value.toLowerCase();

    return this.quellen.filter(quelle => quelle.name.toLowerCase().includes(filterValue));
  }

  private activateQuelleCreation(event: any): void {
    console.log('button clicked')
    this.activationQuelleCreationEnabled = true;
  }

}
