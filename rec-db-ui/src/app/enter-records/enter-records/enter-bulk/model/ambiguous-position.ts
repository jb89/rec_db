import { RecipePosition } from './recipe-position';
import { RecipeResource } from '../../../../shared/models/recipe-resource';

export class AmbiguousPosition {
    stelle: string;
    recipePosition: RecipePosition;

    constructor(stelle: string, rezepte: RecipePosition) {
        this.stelle = stelle;
        this.recipePosition = rezepte;
    }
}
