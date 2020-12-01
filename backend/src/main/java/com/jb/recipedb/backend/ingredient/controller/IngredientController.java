package com.jb.recipedb.backend.ingredient.controller;

import java.util.Optional;

import com.jb.recipedb.backend.ingredient.dao.IIngredientRepository;
import com.jb.recipedb.backend.ingredient.dao.IngredientDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class IngredientController {

    @Autowired
    private IIngredientRepository ingredientRepo;

    public IngredientDao findOrCreateIngredient(String ingredientName) {
        Optional<IngredientDao> oIngredient = this.ingredientRepo.findByName(ingredientName);
        if (oIngredient.isPresent()) {
            return oIngredient.get();
        } else {
            IngredientDao ing = new IngredientDao();
            ing.setName(ingredientName);
            return ingredientRepo.save(ing);
        }
    }
    
}
