package com.jb.recipedb.backend.recipe.dao;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface IRecipeRepository extends CrudRepository<RecipeDao, String> {

    Optional<RecipeDao> findByName(String name);
    
}
