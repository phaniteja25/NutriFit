package com.ase.project.nutri_fit_app.controller;


import com.ase.project.nutri_fit_app.config.JwtUtils;
import com.ase.project.nutri_fit_app.dto.*;
import com.ase.project.nutri_fit_app.model.Meal;
import com.ase.project.nutri_fit_app.service.MealService;
import com.ase.project.nutri_fit_app.util.APIClient;
import com.ase.project.nutri_fit_app.util.ApiParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpResponse;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/meals")
public class MealsController {


    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private APIClient apiClient;

    @Autowired
    private ApiParser apiParser;

    @Autowired
    private MealService mealService;

    @PostMapping("/log")
    public ResponseEntity<List<Meal>> logMeals(@RequestHeader("Authorization") String token,
                                               @RequestParam("prompt") String prompt) {
        try {
            System.out.println(token);
            // Extract the user ID from the JWT token
            String username = jwtUtils.extractUsername(token.substring(7)); // Remove "Bearer " prefix

            System.out.println(username);
            // Calling API
            String apiResponseJson = apiClient.sendRequest(prompt);
            System.out.println(apiResponseJson);

            // Calling MealService and processing apiResponseJson and storing in DB
            List<Meal> mealList = mealService.log_meal(apiResponseJson, username);

            if (!mealList.isEmpty()) {
                return ResponseEntity.status(HttpStatus.CREATED).body(mealList); // Return the list of meals if not empty
            } else {
                return ResponseEntity.ok(new ArrayList<>()); // Return an empty list if meals could not be logged
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // Return null or handle it as needed
        }
    }


    @GetMapping("/get_current_day_meals")
    public ResponseEntity<?> getCurrentDayMeals(@RequestHeader("Authorization") String token) {
        try {
            // Check if token is present and valid
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Authorization token is missing or invalid.");
            }

            String username = jwtUtils.extractUsername(token.substring(7)); // Remove "Bearer " prefix
            LocalDate currentDate = LocalDate.now();

            List<Meal> result = mealService.get_log_meals_for_today(username, currentDate);

            if (result == null || result.isEmpty()) {
                // Return 404 if no meals are found for the day
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No meals found for the current day.");
            }

            // Return 200 OK with the list of meals
            return ResponseEntity.ok(result);

        } catch (Exception e) {
            // Log the exception for debugging
            System.out.println("Exception Occurred: " + e);

            // Return 500 for any other server error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while fetching the meals.");
        }
    }




    @PostMapping("/update_meal/{meal_id}")
    public ResponseEntity<Meal> update_meal(@RequestHeader("Authorization") String token ,@PathVariable UUID meal_id, @RequestBody MealUpdateDto mealUpdateInfo){

        String username = jwtUtils.extractUsername(token.substring(7)); // Remove "Bearer " prefix
        Meal updatedMeal = null;
        try{
            updatedMeal = mealService.update_given_meal(username,meal_id,mealUpdateInfo);
            if(updatedMeal != null){
                return ResponseEntity.ok(updatedMeal);
            }
            else{
                return ResponseEntity.ok(new Meal());
            }


        }catch (Exception e){
            System.out.println("Exception Occured"+e);

        }
        return ResponseEntity.ok(updatedMeal);
    }

    @DeleteMapping("/delete_meal/{meal_id}")
    public ResponseEntity<String> deleteMeal(@RequestHeader("Authorization") String token, @PathVariable UUID meal_id) {
        try {
            // Check if token is present and valid
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Authorization token is missing or invalid.");
            }

            String username = jwtUtils.extractUsername(token.substring(7)); // Remove "Bearer " prefix
            boolean deleteResult = mealService.delete_given_meal(username, meal_id);

            if (deleteResult) {
                // Return 200 OK if deletion was successful
                return ResponseEntity.ok("Meal deleted successfully.");
            } else {
                // Return 404 Not Found if the meal could not be found or deleted
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Meal not found or could not be deleted.");
            }

        } catch (IllegalArgumentException e) {
            // Return 400 Bad Request for invalid meal ID
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid meal ID provided.");
        } catch (Exception e) {
            // Log the exception for debugging
            System.out.println("Exception Occurred: " + e);

            // Return 500 Internal Server Error for any other exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while deleting the meal.");
        }
    }


    @GetMapping("/current_day_summary")
    public ResponseEntity<?> getCurrentNutriSummary(@RequestHeader("Authorization") String token) {
        try {
            // Check if token is present and valid
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Authorization token is missing or invalid.");
            }

            String username = jwtUtils.extractUsername(token.substring(7)); // Remove "Bearer " prefix
            LocalDate localDate = LocalDate.now();

            // Fetch nutritional summary for the current day
            TotalNutritionalInfo totalNutritionalInfo = mealService.getNutritionalSummary(username, localDate);

            if (totalNutritionalInfo == null) {
                // Return 404 if no nutritional information is available for the day
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No nutritional summary found for the current day.");
            }

            // Return 200 OK with the nutritional summary
            return ResponseEntity.ok(totalNutritionalInfo);

        } catch (IllegalArgumentException e) {
            // Return 400 Bad Request for invalid request data
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid data provided.");
        } catch (Exception e) {
            // Log the exception for debugging
            System.out.println("Exception Occurred: " + e);

            // Return 500 Internal Server Error for any other exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while retrieving the nutritional summary.");
        }
    }



    @GetMapping("/get_all_meals")
    public ResponseEntity<?> getMealsGroupedByDate(@RequestHeader("Authorization") String token) {
        try {
            // Check if token is present and valid
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Authorization token is missing or invalid.");
            }

            String username = jwtUtils.extractUsername(token.substring(7)); // Remove "Bearer " prefix
            List<AllMealsByDateResponseDto> allMealsByDateResponseDto = mealService.getMealsGroupedByDate(username);

            if (allMealsByDateResponseDto == null || allMealsByDateResponseDto.isEmpty()) {
                // Return 404 if no meals are found
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No meals found for the user.");
            }

            // Return 200 OK with the list of meals grouped by date
            return ResponseEntity.ok(allMealsByDateResponseDto);

        } catch (IllegalArgumentException e) {
            // Return 400 Bad Request for invalid request data
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid request data.");
        } catch (Exception e) {
            // Log the exception for debugging
            System.out.println("Exception Occurred: " + e);

            // Return 500 Internal Server Error for any other exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while retrieving meals.");
        }
    }


    @PostMapping("/manual_log")
    public ResponseEntity<?> manualLog(@RequestHeader("Authorization") String token, @RequestBody ManualLoggingDto manualLoggingDto) {
        try {
            // Check if token is present and valid
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Authorization token is missing or invalid.");
            }

            String username = jwtUtils.extractUsername(token.substring(7)); // Remove "Bearer " prefix
            Meal meal = mealService.log_meal_manually(username, manualLoggingDto);

            if (meal == null) {
                // Return 400 Bad Request if meal logging failed (e.g., invalid data)
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Meal logging failed due to invalid data.");
            }

            // Return 201 Created if the meal was logged successfully
            return ResponseEntity.status(HttpStatus.CREATED).body(meal);

        } catch (IllegalArgumentException e) {
            // Return 400 Bad Request if request data is invalid
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid data provided for meal logging.");
        } catch (Exception e) {
            // Log the exception for debugging
            System.out.println("Exception Occurred: " + e);

            // Return 500 Internal Server Error for any other exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while logging the meal.");
        }
    }










}
