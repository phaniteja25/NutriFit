package com.ase.project.nutri_fit_app;

import io.github.cdimascio.dotenv.Dotenv;
import io.github.cdimascio.dotenv.DotenvEntry;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.MapPropertySource;
import org.springframework.core.env.MutablePropertySources;
import org.springframework.core.env.StandardEnvironment;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.stream.Collectors;

@SpringBootApplication
public class NutriFitAppApplication {

	public static void main(String[] args) {



		Dotenv dotenv = Dotenv.load();

		// Set environment variables for Spring Boot
		System.setProperty("SPRING_APPLICATION_NAME", dotenv.get("SPRING_APPLICATION_NAME"));
		System.setProperty("SPRING_DATASOURCE_URL", dotenv.get("SPRING_DATASOURCE_URL"));
		System.setProperty("SPRING_DATASOURCE_USERNAME", dotenv.get("SPRING_DATASOURCE_USERNAME"));
		System.setProperty(("SPRING_DATASOURCE_PASSWORD"),dotenv.get("SPRING_DATASOURCE_PASSWORD"));
		System.setProperty(("SPRING_JPA_HIBERNATE_DDL_AUTO"),dotenv.get("SPRING_JPA_HIBERNATE_DDL_AUTO"));
		System.setProperty(("SPRING_JPA_DATABASE_PLATFORM"),dotenv.get("SPRING_JPA_DATABASE_PLATFORM"));
		System.setProperty(("GEMINI_API_URL"),dotenv.get("GEMINI_API_URL"));
		System.setProperty(("GEMINI_API_KEY"),dotenv.get("GEMINI_API_KEY"));
		System.setProperty(("API_KEY"),dotenv.get("API_KEY"));


		SpringApplication.run(NutriFitAppApplication.class, args);

		System.out.println("Hello Spring Application!! Testing the application agina again");




	}

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}


}
