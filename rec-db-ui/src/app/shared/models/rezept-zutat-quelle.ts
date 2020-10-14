export class RezeptZutatQuelle {

    rezeptQuelleId: number;
    quelleName: string;
    quelleFk: number;
    rezeptName: string;
    rezeptFk: number;
    stelle: string;

    constructor(rezeptQuelleId: number, quelleName: string, quelleFk: number, rezeptFk: number, rezeptName: string, stelle: string) {
        this.rezeptQuelleId = rezeptQuelleId;
        this.quelleName = quelleName;
        this.quelleFk = quelleFk;
        this.rezeptFk = rezeptFk;
        this.rezeptName = rezeptName;
        this.stelle = stelle;
    }
}
