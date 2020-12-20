package com.jb.recipedb.backend.reciperesource.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.jb.recipedb.backend.ingredientrecipe.dao.IIngredientRecipeRepository;
import com.jb.recipedb.backend.ingredientrecipe.dao.IngredientRecipeDao;
import com.jb.recipedb.backend.reciperesource.dao.IRecipeResourceRepository;
import com.jb.recipedb.backend.reciperesource.dao.RecipeResourceDao;
import com.jb.recipedb.backend.reciperesource.dto.RecipeResourceIngredientDto;
import com.jb.recipedb.backend.reciperesource.dto.RecipeResourcesByResourceDto;
import com.jb.recipedb.backend.resource.controller.ResourceController;
import com.jb.recipedb.backend.resource.dao.IResourceRepository;
import com.jb.recipedb.backend.resource.dao.ResourceDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("recipe-resources")
public class RecipeResourceRestController {

    @Autowired
    private IRecipeResourceRepository repo;

    @Autowired
    private IIngredientRecipeRepository ingredientRecipeRepo;

    @Autowired
    private ResourceController resourceController;

    @GetMapping(value = "")
    public List<RecipeResourceDao> getRecipeResourcesForResourceAndIngredient(@RequestParam String resourceName,
            @RequestParam String ingredientName) {
        return this.repo.findByResourceAndIngredient(resourceName, ingredientName);
    }

    @GetMapping(value = "by-resource")
    public List<RecipeResourceDao> getRecipeResourcesForResource(@RequestParam String resourceName) {
        ResourceDao resource = this.resourceController.findResource(resourceName);
        return this.repo.findByResourceDao(resource);
    }

    @GetMapping(value = "by-ingredient/ordered-by-resource")
    public List<RecipeResourcesByResourceDto> getRecipeResourcesForIngredientOrderedByResource(
            @RequestParam String ingredientName) {
        return this.repo.findResourceNamesGroupedByResourceDao().stream()//
                .map(resourceName -> {
                    return new RecipeResourcesByResourceDto(resourceName,
                            this.repo.findByResourceAndIngredient(resourceName, ingredientName));
                })//
                .filter(rr -> rr.getRecipeResources().size() > 0)//
                .collect(Collectors.toList());
    }

    @PutMapping("by-ingredient")
    public RecipeResourceDao setRecipeResourcesForIngredient(@RequestBody RecipeResourceIngredientDto dto, @RequestParam String position) {
        IngredientRecipeDao ir = new IngredientRecipeDao();
        ir.setIngredientDao(dto.getIngredient());
        ir.setRecipeDao(dto.getRecipe());
        this.ingredientRecipeRepo.save(ir);

        RecipeResourceDao rr = new RecipeResourceDao();
        rr.setPosition(position);
        rr.setRecipeDao(dto.getRecipe());
        rr.setResourceDao(dto.getResource());
        return this.repo.save(rr);
    }
}
