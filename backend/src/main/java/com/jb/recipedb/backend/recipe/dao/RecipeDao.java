package com.jb.recipedb.backend.recipe.dao;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.jb.recipedb.backend.ingredientrecipe.dao.IngredientRecipeDao;
import com.jb.recipedb.backend.reciperesource.dao.RecipeResourceDao;

@Entity
@Table(name = "recipe")
public class RecipeDao {

    @Id
    private String name;

    @OneToMany(mappedBy = "recipeDao")
    private Set<RecipeResourceDao> recipeResources = new HashSet<>();

    @OneToMany(mappedBy = "recipeDao")
    private Set<IngredientRecipeDao> IngredientRecipes = new HashSet<>();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<RecipeResourceDao> getRecipeResources() {
        return recipeResources;
    }

    public Set<IngredientRecipeDao> getIngredientRecipes() {
        return IngredientRecipes;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((name == null) ? 0 : name.hashCode());
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
        RecipeDao other = (RecipeDao) obj;
        if (name == null) {
            if (other.name != null)
                return false;
        } else if (!name.equals(other.name))
            return false;
        return true;
    }

}
