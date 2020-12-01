package com.jb.recipedb.backend.recipe.controller;

import java.util.Optional;

import com.jb.recipedb.backend.recipe.dao.IRecipeRepository;
import com.jb.recipedb.backend.recipe.dao.RecipeDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class RecipeController {

    @Autowired
    private IRecipeRepository recipeRepo;

    public RecipeDao findOrCreateRecipe(String recipeName) {
        Optional<RecipeDao> oRecipe = this.recipeRepo.findByName(recipeName);
        if (oRecipe.isPresent()) {
            return oRecipe.get();
        } else {
            RecipeDao newRecipe = new RecipeDao();
            newRecipe.setName(recipeName);
            return this.recipeRepo.save(newRecipe);
        }
    }
    
}
