package com.jb.recipedb.backend.reciperesource.controller;

import java.util.Optional;

import com.jb.recipedb.backend.recipe.dao.RecipeDao;
import com.jb.recipedb.backend.reciperesource.dao.IRecipeResourceRepository;
import com.jb.recipedb.backend.reciperesource.dao.RecipeResourceDao;
import com.jb.recipedb.backend.resource.dao.ResourceDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class RecipeResourceController {

    @Autowired
    private IRecipeResourceRepository recipeResourceRepo;

    public RecipeResourceDao findOrCreateRecipeResource(RecipeDao recipeDao, ResourceDao resourceDao, String position) {
        Optional<RecipeResourceDao> oDao = this.recipeResourceRepo.findByRecipeDaoAndResourceDao(recipeDao,
                resourceDao);
        if (oDao.isPresent()) {
            return oDao.get();
        } else {
            RecipeResourceDao dao = new RecipeResourceDao();
            dao.setRecipeDao(recipeDao);
            dao.setResourceDao(resourceDao);
            dao.setPosition(position);
            return this.recipeResourceRepo.save(dao);
        }
    }

}
