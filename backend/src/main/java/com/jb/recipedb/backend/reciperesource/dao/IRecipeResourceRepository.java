package com.jb.recipedb.backend.reciperesource.dao;

import java.util.Optional;

import com.jb.recipedb.backend.recipe.dao.RecipeDao;
import com.jb.recipedb.backend.resource.dao.ResourceDao;

import org.springframework.data.repository.CrudRepository;

public interface IRecipeResourceRepository extends CrudRepository<RecipeResourceDao, String> {

    Optional<RecipeResourceDao> findByRecipeDaoAndResourceDao(RecipeDao recipeDao, ResourceDao resourceDao);
    
}
