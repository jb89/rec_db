package com.jb.recipedb.backend.reciperesource.dao;

import java.util.List;
import java.util.Optional;

import com.jb.recipedb.backend.ingredient.dao.IngredientDao;
import com.jb.recipedb.backend.recipe.dao.RecipeDao;
import com.jb.recipedb.backend.resource.dao.ResourceDao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface IRecipeResourceRepository extends CrudRepository<RecipeResourceDao, String> {
    
    Optional<RecipeResourceDao> findByRecipeDaoAndResourceDao(RecipeDao recipeDao, ResourceDao resourceDao);

    List<RecipeResourceDao> findByResourceDao(ResourceDao resourceDao);

    @Query(value = "select * from recipe_resource rs join ingredient_recipe ir on rs.recipe_dao_name = ir.recipe_dao_name where ir.ingredient_dao_name = :ingredientName and rs.resource_dao_name = :resourceName", nativeQuery = true)
    List<RecipeResourceDao> findByResourceAndIngredient(@Param("resourceName") String resourceDaoName, @Param("ingredientName") String ingredientDaoName);

    @Query(value = "select resource_dao_name from recipe_resource rs group by rs.resource_dao_name", nativeQuery = true)
    List<String> findResourceNamesGroupedByResourceDao();
    
}
