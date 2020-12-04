import { Recipe } from 'src/app/shared/models/recipe';
import { Resource } from './resource';
export class RecipeResource {
    recipe: Recipe;
    resource: Resource;
    position: string;

    constructor(recipe: Recipe, resource: Resource, position: string) {
        this.recipe = recipe;
        this.resource = resource;
        this.position = position;
    }
}
