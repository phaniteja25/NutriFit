package com.ase.project.nutri_fit_app.service;

import com.ase.project.nutri_fit_app.dto.MealPlanRequestDto;
import com.ase.project.nutri_fit_app.dto.MealPlanResponseDto;
import com.ase.project.nutri_fit_app.model.MealPlan;
import com.ase.project.nutri_fit_app.model.Users;
import com.ase.project.nutri_fit_app.repo.UserRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.lang3.StringEscapeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;

@Service
public class GeminiApiService {

    @Value("${GEMINI_API_KEY}")
    private static String API_KEY;


    private final String API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key="+API_KEY;


    private final RestTemplate restTemplate;


    @Autowired
    UserRepository userRepository;

    public GeminiApiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public MealPlanResponseDto getMealPlan(MealPlanRequestDto mealPlanRequestDto) {
        // Set up headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String prompt = generatePrompt(mealPlanRequestDto.getNoOfDaysPlan(), mealPlanRequestDto.getCuisineType(), mealPlanRequestDto.getFoodPref(), mealPlanRequestDto.getAllergies());

        String escapedPrompt = StringEscapeUtils.escapeJson(prompt);
        // Prepare request body as a JSON string

        String requestBody = String.format("""
                {
                          "contents": [
                            {
                              "parts": [
                                {
                                  "text": "%s"
                                }
                              ]
                            }
                          ]
                        }
                                
                                
                """, escapedPrompt);

        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        // Build URI for API

        // Make the API call
        ResponseEntity<String> response = restTemplate.exchange(API_URL, HttpMethod.POST, entity, String.class);

        System.out.println("Raw JSON Response: " + response.getBody());

        String jsonResponse = extractAndCleanJson(response.getBody());

        if (jsonResponse == null) {
            return null;
        }

        MealPlanResponseDto mealPlanResponseDto = parseMealPlanResponse(jsonResponse);

        return mealPlanResponseDto;



    }

    public MealPlanResponseDto parseMealPlanResponse(String jsonResponse) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(jsonResponse, MealPlanResponseDto.class);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }



    private String extractAndCleanJson(String responseBody) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();

            JsonNode rootNode = objectMapper.readTree(responseBody);
            String jsonText = rootNode
                    .path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();

            // Remove any Markdown formatting (```json ... ```)
            if (jsonText.startsWith("```")) {
                jsonText = jsonText.replaceAll("```json", "").replaceAll("```", "").trim();
            }

            return jsonText;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private String generatePrompt(int noOfDaysPlan, String cuisineType, String foodPref, ArrayList<String> allergies) {

        StringBuilder promptBuilder = new StringBuilder();
        promptBuilder.append("Generate a ")
                .append(noOfDaysPlan).append(" ")
                .append(cuisineType).append(" ")
                .append(foodPref)
                .append(" meal plan in JSON format. Include the following details:\n\n");

        if (allergies != null && !allergies.isEmpty()) {
            promptBuilder.append("Allergies to avoid: ");
            for (int i = 0; i < allergies.size(); i++) {
                promptBuilder.append(allergies.get(i));
                if (i < allergies.size() - 1) {
                    promptBuilder.append(", ");
                }
            }
            promptBuilder.append(".\n\n");
        }
        // Standard details
        promptBuilder.append("1. Disclaimer: Include a disclaimer that this meal plan is a general guideline and that individual needs may vary. ")
                .append("Recommend consulting with a healthcare professional or registered dietitian.\n\n")
                .append("2. Note on Nutritional Values: Mention that the nutritional values provided are estimates and may vary. ")
                .append("Suggest using online nutrition tracking tools like MyFitnessPal or Cronometer for precise calculations.\n\n")
                .append("3. For each day:\n   - List the meals (Breakfast, Lunch, Dinner).\n   - For each meal, include:\n")
                .append("     - Name and description (e.g., \"Poha (flattened rice) with peanuts and vegetables\").\n")
                .append("     - Nutritional values (Protein, Carbs, Fat, Calories).\n\n");

        // Additional requirements

        // Default reminders if no additional requirements are provided
        promptBuilder.append("4. Additional Reminders:\n")
                .append("   - Hydration: Recommend drinking plenty of water throughout the day.\n")
                .append("   - Snacks: Suggest healthy snacks like nuts, fruits, or yogurt.\n")
                .append("   - Customization: Advise adjusting portion sizes and ingredients to individual preferences.\n")
                .append("   - Variety: Encourage experimenting with different recipes and ingredients.\n");


        // Add JSON structure details
        promptBuilder.append("\nPlease provide the output in JSON format with the following structure:\n")
                .append("{\n")
                .append("  \"disclaimer\": \"This meal plan is a general guideline...\",\n")
                .append("  \"note\": \"The nutritional values provided are estimates...\",\n")
                .append("  \"mealPlan\": [\n")
                .append("    {\n")
                .append("      \"day\": \"Day 1\",\n")
                .append("      \"meals\": [\n")
                .append("        {\n")
                .append("          \"type\": \"Breakfast\",\n")
                .append("          \"name\": \"Poha (flattened rice) with peanuts and vegetables (250g)\",\n")
                .append("          \"protein\": \"10g\",\n")
                .append("          \"carbs\": \"50g\",\n")
                .append("          \"fat\": \"15g\",\n")
                .append("          \"calories\": \"250\"\n")
                .append("        },\n")
                .append("        // More meals for Day 1...\n")
                .append("      ]\n")
                .append("    },\n")
                .append("    // More days...\n")
                .append("  ],\n")
                .append("  \"reminders\": [\n")
                .append("    \"Drink plenty of water throughout the day.\",\n")
                .append("    \"Incorporate healthy snacks like nuts, fruits, or yogurt.\",\n")
                .append("    \"Adjust portion sizes and ingredients to suit individual needs.\",\n")
                .append("    \"Experiment with different recipes and ingredients.\"\n")
                .append("  ]\n")
                .append("}");

        return promptBuilder.toString();
    }
}

