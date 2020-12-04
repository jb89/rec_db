package com.jb.recipedb.backend.resource.controller;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import com.jb.recipedb.backend.resource.dao.IResourceRepository;
import com.jb.recipedb.backend.resource.dao.ResourceDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("resources")
public class ResourceRestController {

    @Autowired
    private IResourceRepository repo;

    @GetMapping("")
    public List<ResourceDao> getAllResources() {
        return StreamSupport.stream(repo.findAll().spliterator(), false).collect(Collectors.toList());
    }

    @PutMapping("")
    public ResourceDao putResource(@RequestBody ResourceDao resource) {
        return this.repo.save(resource);
    }

}
