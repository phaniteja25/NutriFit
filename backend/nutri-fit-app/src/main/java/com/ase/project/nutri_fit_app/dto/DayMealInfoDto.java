package com.ase.project.nutri_fit_app.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class DayMealInfoDto {

    private String type;       // e.g., Breakfast, Lunch, Dinner
    private String name;       // e.g., "Poha (flattened rice) with peanuts and vegetables"
    private String protein;    // e.g., "10g"
    private String carbs;      // e.g., "50g"
    private String fat;        // e.g., "15g"
    private String calories;   // e.g., "250"


    public DayMealInfoDto() {
    }


    public DayMealInfoDto(String type, String name, String protein, String carbs, String fat, String calories) {
        this.type = type;
        this.name = name;
        this.protein = protein;
        this.carbs = carbs;
        this.fat = fat;
        this.calories = calories;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProtein() {
        return protein;
    }

    public void setProtein(String protein) {
        this.protein = protein;
    }

    public String getCarbs() {
        return carbs;
    }

    public void setCarbs(String carbs) {
        this.carbs = carbs;
    }

    public String getFat() {
        return fat;
    }

    public void setFat(String fat) {
        this.fat = fat;
    }

    public String getCalories() {
        return calories;
    }

    public void setCalories(String calories) {
        this.calories = calories;
    }
}
