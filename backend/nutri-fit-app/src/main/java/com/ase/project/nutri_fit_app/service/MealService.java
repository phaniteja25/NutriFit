package com.ase.project.nutri_fit_app.service;


import com.ase.project.nutri_fit_app.dto.*;
import com.ase.project.nutri_fit_app.exception.DatabaseConnectionException;
import com.ase.project.nutri_fit_app.model.Meal;
import com.ase.project.nutri_fit_app.model.Users;
import com.ase.project.nutri_fit_app.repo.MealRepository;
import com.ase.project.nutri_fit_app.repo.UserRepository;
import com.ase.project.nutri_fit_app.util.ApiParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
public class MealService {

    @Autowired
    private MealRepository mealRepository;

    @Autowired
    private ApiParser apiParser;

    @Autowired
    private UserRepository userRepository;


    public List<Meal> log_meal(String apiResponseJson, String username) throws Exception {

        try {

            ApiResponse apiResponse = apiParser.parseMealJson(apiResponseJson);

            System.out.println(apiResponse.toString());

            List<APIMealData> mealDataList = apiResponse.getAllMealData();

            Users user = userRepository.findByUsername(username); // Method to find user by username

            List<Meal> mealList = new ArrayList<>();

            if (user == null) {
                throw new Exception("User Not Found");
            }


            for (APIMealData mealData : mealDataList) {
                // Convert APIMealData to your entity model and save it
                Meal mealEntity = new Meal(); // Assuming you have a MealEntity class
                mealEntity.setMealName(mealData.getName());
                mealEntity.setCalories(mealData.getCalories());
                mealEntity.setServing_size(mealData.getServing_size_g());
                mealEntity.setFats(mealData.getFat_total_g());
                mealEntity.setProteins(mealData.getProtein_g());
                mealEntity.setCarbs(mealData.getCarbohydrates_total_g());
                mealEntity.setFibre(mealData.getFiber_g());
                mealEntity.setLog_date(LocalDate.now());
                mealEntity.setLog_time(LocalDateTime.now());


                //save the user with the meal
                mealEntity.setUser(user);
                // Save the meal entity in the database


                mealRepository.save(mealEntity);

                mealList.add(mealEntity);
            }

            return mealList;
        }
        catch (JpaSystemException ex){
            throw new DatabaseConnectionException("Database Connection error"+ex);
        }

    }

    public List<Meal> get_log_meals_for_today(String username, LocalDate current_date) throws Exception {

        try {
            return mealRepository.findMealsByUsernameAndDate(username, current_date);
        }
        catch (JpaSystemException ex){
            throw new DatabaseConnectionException("Database Connection error"+ex);
        }
        catch (Exception e) {
            throw new Exception("Error returning meals of user: " + username);
        }


    }


    public Meal update_given_meal(String username, UUID mealId, MealUpdateDto new_meal) throws Exception {
        try {

            Meal old_meal = mealRepository.findMealByUsernameAndMealID(username, mealId);


            if (old_meal != null) {

                if (new_meal.getMealName() != null) {
                    old_meal.setMealName(new_meal.getMealName());
                }
                if (new_meal.getCalories() != null) {
                    old_meal.setCalories(new_meal.getCalories());
                }
                if (new_meal.getFibre() != null) {
                    old_meal.setFibre(new_meal.getFibre());
                }
                if (new_meal.getFats() != null) {
                    old_meal.setFats(new_meal.getFats());
                }
                if (new_meal.getProteins() != null) {
                    old_meal.setProteins(new_meal.getProteins());
                }
                if (new_meal.getCarbs() != null) {
                    old_meal.setCarbs(new_meal.getCarbs());
                }

                mealRepository.save(old_meal);

            } else {
                throw new Exception("Meal not found");
            }


            return old_meal;
        }
        catch (JpaSystemException ex){
            throw new DatabaseConnectionException("Database Connection error"+ex);
        }

    }


    public boolean delete_given_meal(String username, UUID mealId) {
        try {

            if (mealRepository.existsById(mealId)) {
                mealRepository.deleteById(mealId);
                return true;  // Deletion successful
            } else {
                return false; // Meal not found
            }
        }
        catch (JpaSystemException ex){
            throw new DatabaseConnectionException("Database Connection error"+ex);
        }


    }

    public TotalNutritionalInfo getNutritionalSummary(String username, LocalDate date) {
        try {

            TotalNutritionalInfo totalNutritionalInfo = mealRepository.getTotalNutritionalInfoForDay(username, date);

            if (totalNutritionalInfo != null) {
                return totalNutritionalInfo;
            } else {
                return new TotalNutritionalInfo((double) 0, (double) 0, (double) 0, (double) 0, (double) 0);
            }
        }
        catch (JpaSystemException ex){
            throw new DatabaseConnectionException("Database Connection error"+ex);
        }


    }


    public List<AllMealsByDateResponseDto> getMealsGroupedByDate(String username) throws Exception {
        try {

            List<Meal> meals = mealRepository.findAllByUsernameOrderByDate(username);

            if (meals != null) {

                // Group meals by date using Java Streams
                Map<LocalDate, List<Meal>> groupedMeals = meals.stream()
                        .collect(Collectors.groupingBy(Meal::getLog_date));

                // Convert the Map to a list of MealResponseDTO
                List<AllMealsByDateResponseDto> response = new ArrayList<>();

                groupedMeals.forEach((date, mealsForDate) ->
                        response.add(new AllMealsByDateResponseDto(date, mealsForDate))
                );


                return response;
            } else {
                throw new Exception("Could not find meals for the given user");
            }
        }
        catch (JpaSystemException ex){
            throw new DatabaseConnectionException("Database Connection error"+ex);
        }

    }

    public Meal log_meal_manually(String username, ManualLoggingDto manualLoggingDto) throws Exception {

        try {
            Users user = userRepository.findByUsername(username); // Method to find user by username

            if (user == null) {
                throw new Exception("User not found");
            }

            Meal new_meal = new Meal();


            new_meal.setMealName(manualLoggingDto.getMeal_name());
            new_meal.setCarbs(manualLoggingDto.getCarbs());
            new_meal.setFats(manualLoggingDto.getFats());
            new_meal.setFibre(manualLoggingDto.getFibre());
            new_meal.setProteins(manualLoggingDto.getProteins());
            new_meal.setLog_time(LocalDateTime.now());
            new_meal.setLog_date(LocalDate.now());
            new_meal.setCalories(manualLoggingDto.getCalories());
            new_meal.setServing_size(manualLoggingDto.getServing_size());

            new_meal.setUser(user);

            mealRepository.save(new_meal);

            return new_meal;

        } catch (JpaSystemException ex) {
            throw new DatabaseConnectionException("Database Connection error" + ex);
        }
        catch (Exception e){
            throw  new Exception("Error occured"+e);
        }
    }
}


