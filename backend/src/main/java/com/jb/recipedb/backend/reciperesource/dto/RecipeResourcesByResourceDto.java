package com.jb.recipedb.backend.reciperesource.dto;

import java.util.List;

import com.jb.recipedb.backend.reciperesource.dao.RecipeResourceDao;

public class RecipeResourcesByResourceDto {

    private String resource;
    private List<RecipeResourceDao> recipeResources;

    public RecipeResourcesByResourceDto(String resource, List<RecipeResourceDao> recipeResources) {
        this.resource = resource;
        this.recipeResources = recipeResources;
    }

    public String getResource() {
        return resource;
    }

    public List<RecipeResourceDao> getRecipeResources() {
        return recipeResources;
    }

}
