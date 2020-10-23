export class RezeptStelle {
    rezeptId?: number;
    rezeptName: string;
    stelle: string;

    constructor(rezeptName: string, stelle: string, rezeptId?: number) {
        this.rezeptId = rezeptId;
        this.rezeptName = rezeptName;
        this.stelle = stelle;
    }
}
