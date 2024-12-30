package com.ase.project.nutri_fit_app.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriUtils;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

@Component
public class APIClient {

    @Value("${API_KEY}")
    String apiKey;

    public String sendRequest(String prompt) throws  Exception{

        // Create an HttpClient instance
        HttpClient client = HttpClient.newHttpClient();



        String apiUrl = "https://api.calorieninjas.com/v1/nutrition?query="+ UriUtils.encode(prompt, StandardCharsets.UTF_8);

        // Create an HttpRequest with a body
        HttpRequest request = HttpRequest.newBuilder()
                .uri(new URI(apiUrl))
                .GET()  // Using GET method
                .header("X-Api-Key", apiKey) // Set the API key in the header
                .header("Content-Type", "application/json") // Set content type if needed
                .build();

        // Sending the request
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        if(response.statusCode() == 200){
            return response.body();
        }
        else{
            throw new RuntimeException("Error retrieving data from the API. Status Code:"+response.statusCode());
        }


    }
}
