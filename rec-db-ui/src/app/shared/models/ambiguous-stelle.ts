import { RezeptStelle } from './rezept-stelle';

export class AmbiguousStelle {
    stelle: string;
    rezepte: RezeptStelle[];

    constructor(stelle: string, rezepte: RezeptStelle[]) {
        this.stelle = stelle;
        this.rezepte = rezepte;
    }
}
