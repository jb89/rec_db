package com.jb.recipedb.backend;

import com.jb.recipedb.backend.resource.dao.IResourceRepository;
import com.jb.recipedb.backend.resource.dao.ResourceDao;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {

	private static final Logger log = LoggerFactory.getLogger(BackendApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner demo(IResourceRepository repo) {
		return (args) -> {
			ResourceDao resource = new ResourceDao();
			resource.setName("TestBuch1");
			resource.setAuthor("testAuthor");
			//repo.save(resource);
		};
	}

}
