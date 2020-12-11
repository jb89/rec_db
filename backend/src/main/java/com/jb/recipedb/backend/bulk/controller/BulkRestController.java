package com.jb.recipedb.backend.bulk.controller;

import java.util.List;

import com.jb.recipedb.backend.bulk.dto.RecipesForResourceDto;
import com.jb.recipedb.backend.reciperesource.dao.RecipeResourceDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("bulk")
public class BulkRestController {

    @Autowired
    private BulkInsertHandler insertHandler;

    @PutMapping("/recipes-for-ingredients")
    public void insertRezepteForZutaten(@RequestParam(value = "resourceName") String resourceName,
            @RequestBody String insertString) {
        this.insertHandler.handleInsertRezepteForZutaten(resourceName, insertString);
    }

    @PutMapping("/recipes-for-resource")
    public List<RecipeResourceDao> insertRecipesForResource(@RequestBody RecipesForResourceDto recipesForResource) {
        return this.insertHandler.handleInsertRecipesForResource(recipesForResource);
    }

    @PutMapping("/test")
    public void putTest() {
        /*
         * ResourceDao resource = new ResourceDao();
         * resource.setName("Indisch Vegetarisch"); resource.setAuthor("Meera Sodha");
         * RecipeDao recipe = new RecipeDao(); recipe.setName("Ananas haldi ka raita");
         * recipeRepo.save(recipe); RecipeResourceDao recipeResource = new
         * RecipeResourceDao(); recipeResource.setRecipeDao(recipe);
         * recipeResource.setResourceDao(resource);
         * recipe.getRecipeResources().add(recipeResource);
         * resource.getRecipeResources().add(recipeResource);
         * recipeResourceRepo.save(recipeResource);
         * 
         * try {
         * 
         * RecipeResourceDao recipeResource2 = new RecipeResourceDao();
         * recipeResource2.setRecipeDao(recipeRepo.findByName("Ananas haldi ka raita"));
         * recipeResource2.setResourceDao(resourceRepo.findByName("Indisch Vegetarisch")
         * ); recipeResourceRepo.save(recipeResource2); } catch (JpaSystemException e) {
         * Throwable cause = e.getMostSpecificCause(); if (cause instanceof
         * SQLiteException) { SQLiteException ex = (SQLiteException) cause;
         * SQLiteErrorCode.fromCode(ex.getResultCode().code).ifPresent(error -> {
         * log.info("SQL Error: " + error); }); } }
         */

    }

}
