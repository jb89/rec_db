package com.jb.recipedb.backend.ingredientrecipe.controller;

import java.util.Optional;

import com.jb.recipedb.backend.ingredient.dao.IngredientDao;
import com.jb.recipedb.backend.ingredientrecipe.dao.IIngredientRecipeRepository;
import com.jb.recipedb.backend.ingredientrecipe.dao.IngredientRecipeDao;
import com.jb.recipedb.backend.recipe.dao.RecipeDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class IngredientRecipeController {

    @Autowired
    private IIngredientRecipeRepository repo;

    public IngredientRecipeDao findOrCreateIngredientRecipe(IngredientDao ingredientDao, RecipeDao recipeDao,
            String quantity) {
        Optional<IngredientRecipeDao> oDao = this.repo.findByIngredientDaoAndRecipeDao(ingredientDao, recipeDao);
        if (oDao.isPresent()) {
            return oDao.get();
        } else {
            IngredientRecipeDao dao = new IngredientRecipeDao();
            dao.setIngredientDao(ingredientDao);
            dao.setRecipeDao(recipeDao);
            dao.setQuantity(quantity);
            return this.repo.save(dao);
        }

    }

}
