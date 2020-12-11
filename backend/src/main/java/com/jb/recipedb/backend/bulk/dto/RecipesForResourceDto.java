package com.jb.recipedb.backend.bulk.dto;

import java.util.List;

import com.jb.recipedb.backend.resource.dao.ResourceDao;

public class RecipesForResourceDto {

    private ResourceDao resource;
    private List<RecipeWithPosition> recipesWithPosition;

    public ResourceDao getResource() {
        return resource;
    }

    public void setResource(ResourceDao resource) {
        this.resource = resource;
    }

    public List<RecipeWithPosition> getRecipesWithPosition() {
        return recipesWithPosition;
    }

    public void setRecipesWithPosition(List<RecipeWithPosition> recipesWithPosition) {
        this.recipesWithPosition = recipesWithPosition;
    }
}

