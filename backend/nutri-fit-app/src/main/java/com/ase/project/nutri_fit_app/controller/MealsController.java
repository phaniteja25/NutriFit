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
                return ResponseEntity.ok(mealList); // Return the list of meals if not empty
            } else {
                return ResponseEntity.ok(new ArrayList<>()); // Return an empty list if meals could not be logged
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // Return null or handle it as needed
        }
    }


    @GetMapping("/get_current_day_meals")
    public ResponseEntity<List<Meal>> get_current_day_meals(@RequestHeader("Authorization") String token) {
        String username = jwtUtils.extractUsername(token.substring(7)); // Remove "Bearer " prefix
        LocalDate current_date = LocalDate.now();

        List<Meal> result = null;
        try {
            result = mealService.get_log_meals_for_today(username, current_date);
        } catch (Exception e) {
            System.out.println("Exception Occured" + e);

        }
        return ResponseEntity.ok(result);

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
    public ResponseEntity<String> delete_meal(@RequestHeader("Authorization") String token, @PathVariable UUID meal_id) {
        String username = jwtUtils.extractUsername(token.substring(7)); // Remove "Bearer " prefix

        boolean delete_result = false;
        try {
            delete_result = mealService.delete_given_meal(username, meal_id);


        } catch (Exception e) {
            System.out.println("Exception Occured" + e);

        }
        if (delete_result) {
            return ResponseEntity.ok("Meal Deleted Succesfully");
        } else {
            return ResponseEntity.ok("Error Deleting Meal");
        }


    }

    @GetMapping("/current_day_summary")
    public ResponseEntity<TotalNutritionalInfo> get_current_nutri_summary(@RequestHeader("Authorization") String token)
    {
        LocalDate localDate = LocalDate.now(); // Parse the date from String to LocalDate
        TotalNutritionalInfo totalNutritionalInfo = null;

        String username = jwtUtils.extractUsername(token.substring(7)); // Remove "Bearer " prefix

        try{
            totalNutritionalInfo = mealService.getNutritionalSummary(username,localDate);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
        return ResponseEntity.ok(totalNutritionalInfo);

    }


    @GetMapping("/get_all_meals")
    public List<AllMealsByDateResponseDto> getMealsGroupedByDate(@RequestHeader("Authorization") String token) {
        String username = jwtUtils.extractUsername(token.substring(7)); // Remove "Bearer " prefix

        List<AllMealsByDateResponseDto> allMealsByDateResponseDto = null;
        try{
           allMealsByDateResponseDto  = mealService.getMealsGroupedByDate(username);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return allMealsByDateResponseDto;
    }


    @PostMapping("/manual_log")
    public ResponseEntity<Meal> manual_log(@RequestHeader ("Authorization") String token ,@RequestBody ManualLoggingDto manualLoggingDto){
        String username = jwtUtils.extractUsername(token.substring(7)); // Remove "Bearer " prefix

        Meal meal = null;

        try {
            meal = mealService.log_meal_manually(username, manualLoggingDto);
        }
        catch (Exception e){
            System.out.println("Exception Occured"+e);
        }
        return  ResponseEntity.ok(meal);
    }









}
