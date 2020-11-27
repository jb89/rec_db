package com.jb.recipedb.backend.reciperesource.dao;

import java.io.Serializable;

import javax.persistence.Embeddable;

@Embeddable
public class RecipeResourceDaoId implements Serializable {

    private static final long serialVersionUID = 1L;
    private String recipeId;
    private String resourceId;

    public RecipeResourceDaoId() {}

    public RecipeResourceDaoId(String recipeId, String resourceId) {
        super();
        this.recipeId = recipeId;
        this.resourceId = resourceId;
    }

    public String getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(String recipeId) {
        this.recipeId = recipeId;
    }

    public String getResourceId() {
        return resourceId;
    }

    public void setResourceId(String resourceId) {
        this.resourceId = resourceId;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((recipeId == null) ? 0 : recipeId.hashCode());
        result = prime * result + ((resourceId == null) ? 0 : resourceId.hashCode());
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
        RecipeResourceDaoId other = (RecipeResourceDaoId) obj;
        if (recipeId == null) {
            if (other.recipeId != null)
                return false;
        } else if (!recipeId.equals(other.recipeId))
            return false;
        if (resourceId == null) {
            if (other.resourceId != null)
                return false;
        } else if (!resourceId.equals(other.resourceId))
            return false;
        return true;
    }

    
    
}
