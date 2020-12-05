package com.jb.recipedb.backend.reciperesource.dao;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.jb.recipedb.backend.recipe.dao.RecipeDao;
import com.jb.recipedb.backend.resource.dao.ResourceDao;

@Entity
@Table(name = "recipe_resource")
public class RecipeResourceDao {

    @EmbeddedId
    private RecipeResourceDaoId id = new RecipeResourceDaoId();

    @ManyToOne
    @MapsId("recipeId")
    private RecipeDao recipeDao;

    @ManyToOne
    @MapsId("resourceId")
    private ResourceDao resourceDao;

    private String position;

    @JsonIgnore
    public RecipeResourceDaoId getId() {
        return id;
    }

    @JsonProperty("recipe")
    public RecipeDao getRecipeDao() {
        return recipeDao;
    }

    public void setRecipeDao(RecipeDao recipeDao) {
        this.recipeDao = recipeDao;
    }

    @JsonProperty("resource")
    public ResourceDao getResourceDao() {
        return resourceDao;
    }

    public void setResourceDao(ResourceDao resourceDao) {
        this.resourceDao = resourceDao;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }
    
}
