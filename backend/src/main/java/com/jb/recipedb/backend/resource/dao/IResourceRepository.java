package com.jb.recipedb.backend.resource.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IResourceRepository extends JpaRepository<ResourceDao, String> {

    Optional<ResourceDao> findByName(String name);
    
}
