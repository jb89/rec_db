package com.jb.recipedb.backend.bulk.dto;

import java.util.ArrayList;
import java.util.List;

public class IngredientByPositionsDto {

    private String name;
    private List<String> positions;

    public List<String> getPositions() {
        if(this.positions == null) {
            this.positions = new ArrayList<>();
        }
        return positions;
    }

    public void setPositions(List<String> positions) {
        this.positions = positions;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
        IngredientByPositionsDto other = (IngredientByPositionsDto) obj;
        if (name == null) {
            if (other.name != null)
                return false;
        } else if (!name.equals(other.name))
            return false;
        return true;
    }
    
}
