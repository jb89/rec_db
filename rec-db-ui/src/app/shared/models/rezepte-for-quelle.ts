import { RezeptStelle } from './rezept-stelle';

export class RezepteForQuelle {
    quelleName: string;
    rezepte: RezeptStelle[];

    constructor(quelleName: string, rezepte: RezeptStelle[]) {
        this.quelleName = quelleName;
        this.rezepte = rezepte;
    }
}
