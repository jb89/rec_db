package com.jb.recipedb.backend.bulk.controller;

import com.jb.recipedb.backend.ingredient.controller.IngredientController;
import com.jb.recipedb.backend.ingredient.dao.IngredientDao;
import com.jb.recipedb.backend.ingredientrecipe.controller.IngredientRecipeController;
import com.jb.recipedb.backend.ingredientrecipe.dao.IngredientRecipeDao;
import com.jb.recipedb.backend.recipe.controller.RecipeController;
import com.jb.recipedb.backend.recipe.dao.RecipeDao;
import com.jb.recipedb.backend.reciperesource.controller.RecipeResourceController;
import com.jb.recipedb.backend.reciperesource.dao.RecipeResourceDao;
import com.jb.recipedb.backend.resource.controller.ResourceController;
import com.jb.recipedb.backend.resource.dao.ResourceDao;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class BulkInsertHandler {

    private static final Logger log = LoggerFactory.getLogger(BulkRestController.class);

    @Autowired
    private ResourceController resourceController;

    @Autowired
    private IngredientController ingredientController;

    @Autowired
    private RecipeController recipeController;

    @Autowired
    private RecipeResourceController recipeResourceController;

    @Autowired
    private IngredientRecipeController ingredientRecipeController;

    /**
     * This method executes bulk import of Rezepte for Zutaten. 
     * @param resourceName Name of Resource
     * @param insertString ex. 'Ananas:Ananas-Kurkuma-Raita#248;Gebratene Ananas mit Kardamomeis#254$Äpfel:Fenchel-Apfel-Chaat mit karamellisierten Mandeln#136$'
     */
    public void handleInsertRezepteForZutaten(String resourceName, String insertString) {
        ResourceDao resourceDao = this.resourceController.findResource(resourceName);
        log.info("start processing for resource: " + resourceDao.getName());

        int zutatenCount = 0;
        int rezepteCount = 0;
        insertString = normalizeInputString(insertString);
        String[] ingredientBlocks = splitToIngredientBlocks(insertString);
        log.info("trying to insert Recipes for " + ingredientBlocks.length + " Ingredients");
        for (String ingredientBlock : ingredientBlocks) {
            String[] ingredientWithRecipes = splitToIngredientWithRecipesArr(ingredientBlock);
            String ingredientName = ingredientWithRecipes[0];
            log.info("Inserting for Ingredient: " + ingredientName);
            IngredientDao ingredientDao = this.ingredientController.findOrCreateIngredient(ingredientName);
            zutatenCount++;
            for (String recipe : this.splitToRecipes(ingredientWithRecipes[1])) {
                log.info("inserting recipe " + recipe);
                String[] recipeWithPosition = this.splitToRecipeWithPosition(recipe);
                String recipeName = recipeWithPosition[0];
                String recipePosition = recipeWithPosition[1];
                RecipeDao recipeDao = this.recipeController.findOrCreateRecipe(recipeName);
                RecipeResourceDao recipeResource = this.recipeResourceController.findOrCreateRecipeResource(recipeDao, resourceDao, recipePosition);
                IngredientRecipeDao ingredientRecipe = this.ingredientRecipeController.findOrCreateIngredientRecipe(ingredientDao, recipeDao, null);
                rezepteCount++;
                log.info("Zuordnung OK: Rezept " + recipeDao.getName() + //
                " zu Quelle " + resourceDao.getName() + //
                " an Stelle " + recipeResource.getPosition() + //
                " Für Zutat " + ingredientRecipe.getIngredientDao().getName());
            }
        }
        log.info("**********Bulk import of "+ zutatenCount +" Zutaten und "+ rezepteCount +" Rezepte completed **********");
    }

    private String[] splitToRecipeWithPosition(String recipeString) {
        return recipeString.split("\\#");
    }

    private String[] splitToRecipes(String ingredientWithRecipes) {
        return ingredientWithRecipes.split("\\;");
    }

    private String[] splitToIngredientWithRecipesArr(String ingredientBlock) {
        return ingredientBlock.split("\\:");
    }

    private String[] splitToIngredientBlocks(String insertString) {
        return insertString.split("\\$");
    }

    private String normalizeInputString(String inputString) {
        return inputString.trim();
    }

}
