package com.jb.recipedb.backend.ingredient.dao;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jb.recipedb.backend.ingredientrecipe.dao.IngredientRecipeDao;

@Entity
@Table(name = "ingredient")
public class IngredientDao {

    @Id
    private String name;

    @OneToMany(mappedBy = "ingredientDao")
    private Set<IngredientRecipeDao> IngredientRecipes = new HashSet<>();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @JsonIgnore
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
        IngredientDao other = (IngredientDao) obj;
        if (name == null) {
            if (other.name != null)
                return false;
        } else if (!name.equals(other.name))
            return false;
        return true;
    }
}
