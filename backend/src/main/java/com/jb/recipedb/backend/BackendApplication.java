package com.jb.recipedb.backend;

import com.jb.recipedb.backend.recipe.dao.IRecipeRepository;
import com.jb.recipedb.backend.reciperesource.dao.IRecipeResourceRepository;
import com.jb.recipedb.backend.resource.dao.IResourceRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner demo(IResourceRepository resourceRepo, IRecipeRepository recipeRepo, IRecipeResourceRepository recipeResourceRepo) {
		return (args) -> {
			
		};
	}

}
