package com.ase.project.nutri_fit_app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class NutriFitAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(NutriFitAppApplication.class, args);

		System.out.println("Hello Spring Application!! Testing the application agina again");

	}

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}


}
