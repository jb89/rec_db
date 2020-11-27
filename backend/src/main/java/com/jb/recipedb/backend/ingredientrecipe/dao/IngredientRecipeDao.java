package com.jb.recipedb.backend.ingredientrecipe.dao;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

import com.jb.recipedb.backend.ingredient.dao.IngredientDao;
import com.jb.recipedb.backend.recipe.dao.RecipeDao;

@Entity
@Table(name = "ingredient_recipe")
public class IngredientRecipeDao {

    @EmbeddedId
    private IngredientRecipeDaoId id = new IngredientRecipeDaoId();

    @ManyToOne
    @MapsId("ingredientId")
    private IngredientDao ingredientDao;

    @ManyToOne
    @MapsId("recipeId")
    private RecipeDao recipeDao;

    private String quantity;

    public IngredientRecipeDaoId getId() {
        return id;
    }

    public IngredientDao getIngredientDao() {
        return ingredientDao;
    }

    public void setIngredientDao(IngredientDao ingredientDao) {
        this.ingredientDao = ingredientDao;
    }

    public RecipeDao getRecipeDao() {
        return recipeDao;
    }

    public void setRecipeDao(RecipeDao recipeDao) {
        this.recipeDao = recipeDao;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }
    
}
