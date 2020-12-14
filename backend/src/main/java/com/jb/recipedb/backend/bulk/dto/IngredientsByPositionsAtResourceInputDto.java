package com.jb.recipedb.backend.bulk.dto;

import java.util.List;

import com.jb.recipedb.backend.resource.dao.ResourceDao;

public class IngredientsByPositionsAtResourceInputDto {

    private ResourceDao resource;
    private List<IngredientByPositionsDto> ingredientsByPositions;

    public ResourceDao getResource() {
        return resource;
    }

    public void setResource(ResourceDao resource) {
        this.resource = resource;
    }

    public List<IngredientByPositionsDto> getIngredientsByPositions() {
        return ingredientsByPositions;
    }

    public void setIngredientsByPositions(List<IngredientByPositionsDto> ingredientsByPositions) {
        this.ingredientsByPositions = ingredientsByPositions;
    }

}
