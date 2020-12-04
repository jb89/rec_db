import { RecipeResource } from './recipe-resource';

export class AmbiguousPosition {
    stelle: string;
    rezepte: RecipeResource[];

    constructor(stelle: string, rezepte: RecipeResource[]) {
        this.stelle = stelle;
        this.rezepte = rezepte;
    }
}
