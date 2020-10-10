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
  quelleAutorFormControl = new FormControl();
  quelleAutorInput = '';

  constructor(private backendService: BackendService) {
    this.quellen = [new Quelle('q1', 'a1'), new Quelle('q2', 'a2')];
  }

  ngOnInit(): void {
    this.filteredQuellen = this.quellenFormControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterQuellen(value))
      );

    this.quelleAutorFormControl.valueChanges.subscribe(value => this.quelleAutorInput = value);

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
    const filterValue = value.toLowerCase();

    return this.quellen.filter(quelle => quelle.name.toLowerCase().includes(filterValue));
  }

  activateQuelleCreation(event: any): void {
    this.activationQuelleCreationEnabled = true;
  }

  addNewQuelle(event: any): void {
    console.log(`creating new Quelle for AUthor ${this.quelleAutorInput}`);
  }

  abortQuelleCreation(event: any): void {
    this.activationQuelleCreationEnabled = false;
  }

}
