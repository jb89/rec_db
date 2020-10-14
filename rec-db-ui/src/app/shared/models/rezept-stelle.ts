export class RezeptStelle {
    rezeptId: number;
    rezeptName: string;
    stelle: string;

    constructor(rezeptId: number, rezeptName: string, stelle: string) {
        this.rezeptId = rezeptId;
        this.rezeptName = rezeptName;
        this.stelle = stelle;
    }
}
