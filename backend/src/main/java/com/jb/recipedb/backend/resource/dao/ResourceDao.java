package com.jb.recipedb.backend.resource.dao;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.jb.recipedb.backend.reciperesource.dao.RecipeResourceDao;

@Entity
@Table(name = "resource")
public class ResourceDao {

    @Id
    private String name;

    private String author;

    @OneToMany(mappedBy = "resourceDao")
    private Set<RecipeResourceDao> recipeResources = new HashSet<>();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Set<RecipeResourceDao> getRecipeResources() {
        return recipeResources;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        ResourceDao other = (ResourceDao) obj;
        if (name == null) {
            if (other.name != null)
                return false;
        } else if (!name.equals(other.name))
            return false;
        return true;
    }

    

}
