package com.ase.project.nutri_fit_app.util;

import com.ase.project.nutri_fit_app.dto.ApiResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

@Component
public class ApiParser {

    public  ApiResponse parseMealJson(String jsonResponse) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();

        // Parse the JSON string into ApiResponse class
        ApiResponse response = objectMapper.readValue(jsonResponse, ApiResponse.class);
        return response;
    }
}
