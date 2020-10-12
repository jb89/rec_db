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

  quellen: Quelle[] = [];
  quellenNames: string[];
  quelleNameInput = '';
  needNewQuelle = false;
  activationQuelleCreationEnabled = false;
  quelleAutorFormControl = new FormControl();
  quelleAutorInput = '';
  quelleOk = false;

  constructor(private backendService: BackendService) {
  }

  ngOnInit(): void {
    this.backendService.getQuellen().subscribe(quellen => {
      this.quellenNames = quellen.map(q => q.name);
      console.log(this.quellenNames);
      this.quellen = quellen;
    });

    this.quelleAutorFormControl.valueChanges.subscribe(value => this.quelleAutorInput = value);
  }

  /**
   * Input-Child-Componet either sends undefined or single value of chosen Quelle. This method decides,
   * if we have to create a new Quelle or not.
   * @param quelle quelle from Child-Component. 
   */
  setQuelle(quelle: string): void {
    if (quelle === undefined) {
      return;
    }
    console.log(`chosen quelle: ${quelle}`);
    this.quellenNames = this.quellen.map(q => q.name);
    if (this.quellenNames.includes(quelle)) {
      console.log('new quelle exists');
    } else {
      console.log('new quelle is necessary');
    }
  }

  activateQuelleCreation(event: any): void {
    this.activationQuelleCreationEnabled = true;
  }

  addNewQuelle(event: any): void {
    const q = new Quelle(this.quelleNameInput, this.quelleAutorInput);
    this.backendService.createQuelle(q).subscribe(createdObj => {
      if (createdObj.name === this.quelleNameInput) {
        this.quelleOk = true;
        this.quelleAutorFormControl.disable();
      } else {
        this.quelleOk = false;
      }
    });
  }


  abortQuelleCreation(event: any): void {
    this.activationQuelleCreationEnabled = false;
  }

}
