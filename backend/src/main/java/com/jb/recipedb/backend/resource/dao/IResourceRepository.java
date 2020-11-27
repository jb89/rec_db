package com.jb.recipedb.backend.resource.dao;

import org.springframework.data.repository.CrudRepository;

public interface IResourceRepository extends CrudRepository<ResourceDao, String> {

    ResourceDao findByName(String name);
    
}
