import { RecipeResource } from './recipe-resource';

export class RecipeResourcesByResource {
    resource: string;
    recipeResources: RecipeResource[];

    constructor(resource: string, recipeResources: RecipeResource[]) {
        this.resource = resource;
        this.recipeResources = recipeResources;
    }
}
