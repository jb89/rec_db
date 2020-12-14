package com.jb.recipedb.backend.bulk.dto;

import java.util.ArrayList;
import java.util.List;

import com.jb.recipedb.backend.ingredientrecipe.dao.IngredientRecipeDao;

public class IngredientsByPositionsAtResourceOutputDto {

    List<IngredientRecipeDao> successful;
    List<IngredientByPositionsDto> failures;

    public List<IngredientRecipeDao> getSuccessful() {
        if (this.successful == null) {
            this.successful = new ArrayList<>();
        }
        return successful;
    }

    public List<IngredientByPositionsDto> getFailures() {
        if (this.failures == null) {
            this.failures = new ArrayList<>();
        }
        return failures;
    }

    public void addFail(String ingredient, String position) {
        IngredientByPositionsDto dto = this.getFailures().stream().filter(f -> f.getName().equals(ingredient)).findAny().orElseGet(() -> {
            IngredientByPositionsDto tempDto = new IngredientByPositionsDto();
            tempDto.setName(ingredient);
            return tempDto;
        });
        dto.getPositions().add(position);
    }

}
