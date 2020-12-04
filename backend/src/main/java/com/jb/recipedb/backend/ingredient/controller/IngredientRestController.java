package com.jb.recipedb.backend.ingredient.controller;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

import com.jb.recipedb.backend.ingredient.dao.IIngredientRepository;
import com.jb.recipedb.backend.ingredient.dao.IngredientDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("ingredients")
public class IngredientRestController {

    @Autowired
    private IIngredientRepository ingredientRepo;

    @GetMapping("")
    public List<IngredientDao> getIngredients() {
        return StreamSupport.stream(this.ingredientRepo.findAll().spliterator(), false).collect(Collectors.toList());
    }

    @PutMapping("")
    public IngredientDao createIngredient(@RequestBody IngredientDao ingredient) {
        return this.ingredientRepo.save(ingredient);
    }
    
}
