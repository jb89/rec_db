package com.jb.recipedb.backend.recipe.controller;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import javax.websocket.server.PathParam;

import com.jb.recipedb.backend.recipe.dao.IRecipeRepository;
import com.jb.recipedb.backend.recipe.dao.RecipeDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("recipes")
public class RecipeRestController {

    @Autowired
    private IRecipeRepository repo;

    @GetMapping("")
    public List<RecipeDao> findAll() {
        return StreamSupport.stream(this.repo.findAll().spliterator(), false).collect(Collectors.toList());
    }

    @PutMapping("")
    public RecipeDao createRecipe(@RequestBody RecipeDao recipeDao) {
        return this.repo.save(recipeDao);
    }

}
