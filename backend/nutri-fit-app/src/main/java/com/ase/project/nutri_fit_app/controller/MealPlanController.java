package com.ase.project.nutri_fit_app.controller;


import com.ase.project.nutri_fit_app.config.JwtUtils;
import com.ase.project.nutri_fit_app.dto.MealPlanRequestDto;
import com.ase.project.nutri_fit_app.dto.MealPlanResponseDto;
import com.ase.project.nutri_fit_app.service.GeminiApiService;
import com.ase.project.nutri_fit_app.service.MealPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/mealPlan")
public class MealPlanController {
    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private GeminiApiService geminiApiService;

    @Autowired
    private MealPlanService mealPlanService;

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestHeader("Authorization") String token, @RequestBody MealPlanRequestDto mealPlanRequestDto) {
        try {
            // Check if token is present and valid
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Authorization token is missing or invalid.");
            }

            String username = jwtUtils.extractUsername(token.substring(7)); // Remove "Bearer " prefix

            // Generate meal plan response from the external service
            MealPlanResponseDto mealPlanResponseDto = geminiApiService.getMealPlan(mealPlanRequestDto);

            if (mealPlanResponseDto == null) {
                // Return 404 if the external service didn't return a meal plan
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Meal plan could not be generated.");
            }

            // Save the meal plan
            mealPlanResponseDto = mealPlanService.saveMealPlan(username, mealPlanResponseDto);

            // Return 201 Created with the saved meal plan
            return ResponseEntity.status(HttpStatus.CREATED).body(mealPlanResponseDto);

        } catch (IllegalArgumentException e) {
            // Return 400 Bad Request if request data is invalid
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid meal plan request data.");
        } catch (Exception e) {
            // Log the exception for debugging
            System.out.println("Exception Occurred: " + e);

            // Return 500 Internal Server Error for any other exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while creating the meal plan.");
        }
    }



    @GetMapping("/getmeals")
    public ResponseEntity<?> getMeals(@RequestHeader("Authorization") String token) {
        try {
            // Check if token is present and valid
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Authorization token is missing or invalid.");
            }

            String username = jwtUtils.extractUsername(token.substring(7)); // Remove "Bearer " prefix
            MealPlanResponseDto mealPlanResponseDto = mealPlanService.getMealPlanDB(username);

            if (mealPlanResponseDto == null) {
                // Return 404 if no meal plan is found for the user
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No meal plan found for the user.");
            }

            // Return 200 OK with the meal plan
            return ResponseEntity.ok(mealPlanResponseDto);

        } catch (IllegalArgumentException e) {
            // Return 400 Bad Request for invalid request data
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid request data.");
        } catch (Exception e) {
            // Log the exception for debugging
            System.out.println("Could not load your meals: " + e);

            // Return 500 Internal Server Error for any other exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while retrieving the meal plan.");
        }
    }


}
