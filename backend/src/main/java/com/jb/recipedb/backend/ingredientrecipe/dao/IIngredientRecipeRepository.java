package com.jb.recipedb.backend.ingredientrecipe.dao;

import java.util.Optional;

import com.jb.recipedb.backend.ingredient.dao.IngredientDao;
import com.jb.recipedb.backend.recipe.dao.RecipeDao;

import org.springframework.data.repository.CrudRepository;

public interface IIngredientRecipeRepository extends CrudRepository<IngredientRecipeDao, String> {

    public Optional<IngredientRecipeDao> findByIngredientDaoAndRecipeDao(IngredientDao ingredientDao, RecipeDao recipeDao);
    
}
