package com.jb.recipedb.backend.ingredient.dao;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface IIngredientRepository extends CrudRepository<IngredientDao, String> {
    Optional<IngredientDao> findByName(String name);
}
