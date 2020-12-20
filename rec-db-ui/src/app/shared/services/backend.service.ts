import { RecipeResource } from './../models/recipe-resource';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resource } from '../models/resource';
import { Ingredient } from '../models/ingredient';
import { Recipe } from '../models/recipe';
import { RecipeResourcesByResource } from '../models/recipe-resources-by-resource';
import { RecipePosition } from 'src/app/enter-records/enter-records/enter-bulk/model/recipe-position';
import { IngredientPositions } from 'src/app/enter-records/enter-records/enter-bulk/model/ingredient-positions';


@Injectable({
  providedIn: 'root'
})
export class BackendService {
  readonly URL = `http://localhost:8080`;
  readonly PATH_RESOURCES = 'resources';
  readonly PATH_INGREDIENTS = 'ingredients';
  readonly PATH_RECIPERESOURCES = 'recipe-resources';
  readonly PATH_RECIPES = 'recipes';
  readonly PATH_BULK = 'bulk';

  constructor(private http: HttpClient) { }

  getQuellen(): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.URL}/${this.PATH_RESOURCES}/`);
  }

  createQuelle(quelleNameInput: string, quelleAutorInput: string): Observable<Resource> {
    return this.http.put<Resource>(`${this.URL}/${this.PATH_RESOURCES}`, new Resource(quelleNameInput, quelleAutorInput));
  }

  getZutaten(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(`${this.URL}/${this.PATH_INGREDIENTS}`);
  }

  createZutat(zutatName: string): Observable<Ingredient> {
    return this.http.put<Ingredient>(`${this.URL}/${this.PATH_INGREDIENTS}`, { name: zutatName });
  }

  getRezepteForQuelleAndZutat(resourceName: string, ingredientName: string): Observable<RecipeResource[]> {
    return this.http.get<RecipeResource[]>(`${this.URL}/PATH_RECIPERESOURCE?resourceName=${resourceName}&ingredientName=${ingredientName}`);
  }

  getRezepte(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.URL}/${this.PATH_RECIPES}`);
  }

  createRezept(rezeptName: string): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.URL}/${this.PATH_RECIPES}`, { name: rezeptName });
  }
  getRezepteWithQuelleForZutat(zutatName: string): Observable<RecipeResourcesByResource[]> {
    return this.http.get<RecipeResourcesByResource[]>(`${this.URL}/${this.PATH_RECIPERESOURCES}/by-ingredient/ordered-by-resource?ingredientName=${zutatName}`);
  }

  // TODO TEST
  setRezeptForQuelleAndZutat(rezept: Recipe, quelle: Resource, zutat: Ingredient, position: string): Observable<RecipeResource> {
    const payload = {
      recipe: rezept,
      resource: quelle,
      ingredient: zutat
    };
    return this.http.put<RecipeResource>(`${this.URL}/${this.PATH_RECIPERESOURCES}/by-ingredient?position=${position}`, payload);
  }

  putRecipesToResource(rsrc: Resource, recipePosition: RecipePosition[]): Observable<RecipeResource[]>  {
    const payload = {
      resource: rsrc,
      recipesWithPosition: recipePosition
    };
    return this.http.put<RecipeResource[]>(`${this.URL}/${this.PATH_BULK}/recipes-for-resource`, payload);
  }

  putIngredientsToPositionsAtResource(rsrc: Resource, ingredients: IngredientPositions[]): Observable<any> {
    const payload = {
      resource: rsrc,
      ingredientsByPositions: ingredients
    };
    return this.http.put<any>(`${this.URL}/${this.PATH_BULK}/ingredients-to-positions-at-resource`, payload);
  }

  getRezepteForQuelle(quelle: Resource): Observable<RecipeResource[]> {
    return this.http.get<RecipeResource[]>(`${this.URL}/${this.PATH_RECIPERESOURCES}/by-resource?resourceName=${quelle.name}`);
  }
}