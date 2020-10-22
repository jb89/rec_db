import { Component, Input, OnInit } from '@angular/core';
import { Quelle } from 'src/app/shared/models/quelle';

@Component({
  selector: 'app-enter-bulk',
  templateUrl: './enter-bulk.component.html',
  styleUrls: ['./enter-bulk.component.css']
})
export class EnterBulkComponent implements OnInit {

  @Input() quelle: Quelle;
  errorText: string;
  rezepte: rezept[];
  //ambiguousStellen: { stelle: string, namen: string[] }[];
  ambiguousStellen: ambiguousStelle[];

  constructor() { }

  ngOnInit(): void {
    this.quelle = new Quelle(7, 'Die Küche', 'Tim Mälzer');
    this.rezepte = [];
    this.ambiguousStellen = [];
  }

  inputRezepte(event: any): void {
    this.reset();
    const completeString = event.target.value.trim();
    if (completeString.endsWith(';')) {
      this.errorText = 'Am ende darf kein \';\' stehen';
      return;
    }
    const rezepteArr = completeString.split(';');
    for (const rezeptStr of rezepteArr) {
      if (rezeptStr.indexOf('#') !== -1) {
        const rezeptArr = rezeptStr.split('#');
        const rezeptName: string = rezeptArr[0];
        const rezeptStelle: string = rezeptArr[1];
        if (rezeptName.length > 0 && rezeptStelle.length > 0) {
          const r: rezept = {
            name: rezeptArr[0],
            stelle: rezeptArr[1]
          };
          this.rezepte.push(r);
        }
      }
    }
    if (this.rezepte.length < 1) {
      this.errorText = 'Es konnte nichts geparsed werden';
      return;
    }

    const grouped = groupBy(this.rezepte, r => r.stelle);
    console.log('grouped: ', grouped);
    for (const group of grouped) {
      console.log('group: ', group);
      if (group[1].length > 1) {
        const stelle: ambiguousStelle = {
          stelle: group[0],
          rezepte: group[1]
        };
        this.ambiguousStellen.push(stelle);
      }
    }

    console.log('mehrdeutige stellen:');
    console.log(this.ambiguousStellen);
  }



  reset(): void {
    this.errorText = '';
    this.rezepte = [];
    this.ambiguousStellen = [];
  }

  deleteRezept(name: string) {
    console.log(`wir senden nicht mit: ${name}`);
  }

}

function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

interface ambiguousStelle {
  stelle: string;
  rezepte: rezept[];
}

interface rezept {
  name: string;
  stelle: string;
}