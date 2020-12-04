package com.jb.recipedb.backend.reciperesource.dto;

import com.jb.recipedb.backend.ingredient.dao.IngredientDao;
import com.jb.recipedb.backend.recipe.dao.RecipeDao;
import com.jb.recipedb.backend.resource.dao.ResourceDao;

public class RecipeResourceIngredientDto {

    private RecipeDao recipe;
    private ResourceDao resource;
    private IngredientDao ingredient;

    public RecipeDao getRecipe() {
        return recipe;
    }

    public void setRecipe(RecipeDao recipe) {
        this.recipe = recipe;
    }

    public ResourceDao getResource() {
        return resource;
    }

    public void setResource(ResourceDao resource) {
        this.resource = resource;
    }

    public IngredientDao getIngredient() {
        return ingredient;
    }

    public void setIngredient(IngredientDao ingredient) {
        this.ingredient = ingredient;
    }

    
}
