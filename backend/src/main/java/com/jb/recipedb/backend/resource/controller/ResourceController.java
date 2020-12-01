package com.jb.recipedb.backend.resource.controller;

import java.util.NoSuchElementException;

import com.jb.recipedb.backend.resource.dao.IResourceRepository;
import com.jb.recipedb.backend.resource.dao.ResourceDao;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class ResourceController {

    private static final Logger log = LoggerFactory.getLogger(ResourceController.class);

    @Autowired
    private IResourceRepository resourceRepo;

    public ResourceDao findResource(String resourceName) {
        try {
            return this.resourceRepo.findByName(resourceName).orElseThrow();
        } catch (NoSuchElementException e) {
            log.error("Could not find Resource by name", e);
            throw e;
        }
    }



    
}
