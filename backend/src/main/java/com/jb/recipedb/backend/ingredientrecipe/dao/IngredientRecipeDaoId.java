package com.jb.recipedb.backend.ingredientrecipe.dao;

import java.io.Serializable;

import javax.persistence.Embeddable;

@Embeddable
public class IngredientRecipeDaoId implements Serializable {

    private static final long serialVersionUID = 1L;
    private String ingredientId;
    private String recipeId;

    public IngredientRecipeDaoId() {}

    public IngredientRecipeDaoId(String ingredientId, String recipeId) {
        super();
        this.ingredientId = ingredientId;
        this.recipeId = recipeId;
    }

    public String getIngredientId() {
        return ingredientId;
    }

    public void setIngredientId(String ingredientId) {
        this.ingredientId = ingredientId;
    }

    public String getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(String recipeId) {
        this.recipeId = recipeId;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((ingredientId == null) ? 0 : ingredientId.hashCode());
        result = prime * result + ((recipeId == null) ? 0 : recipeId.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        IngredientRecipeDaoId other = (IngredientRecipeDaoId) obj;
        if (ingredientId == null) {
            if (other.ingredientId != null)
                return false;
        } else if (!ingredientId.equals(other.ingredientId))
            return false;
        if (recipeId == null) {
            if (other.recipeId != null)
                return false;
        } else if (!recipeId.equals(other.recipeId))
            return false;
        return true;
    }

    

    
}
