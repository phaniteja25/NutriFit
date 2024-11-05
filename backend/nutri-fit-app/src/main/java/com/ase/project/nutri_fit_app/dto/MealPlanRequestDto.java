package com.ase.project.nutri_fit_app.dto;

import java.util.ArrayList;

public class MealPlanRequestDto {

    private  int noOfDaysPlan;
    private String cuisineType; // Indian or mexican etc

    private  String foodPref; // veg or non veg

    private ArrayList<String> allergies;

    public MealPlanRequestDto(int noOfDaysPlan, String cuisineType, String foodPref, ArrayList<String> allergies) {
        this.noOfDaysPlan = noOfDaysPlan;
        this.cuisineType = cuisineType;
        this.foodPref = foodPref;
        this.allergies = allergies;
    }



    public MealPlanRequestDto() {
    }

    public int getNoOfDaysPlan() {
        return noOfDaysPlan;
    }

    public void setNoOfDaysPlan(int noOfDaysPlan) {
        this.noOfDaysPlan = noOfDaysPlan;
    }

    public String getCuisineType() {
        return cuisineType;
    }

    public void setCuisineType(String cuisineType) {
        this.cuisineType = cuisineType;
    }

    public String getFoodPref() {
        return foodPref;
    }

    public void setFoodPref(String foodPref) {
        this.foodPref = foodPref;
    }

    public ArrayList<String> getAllergies() {
        return allergies;
    }

    public void setAllergies(ArrayList<String> allergies) {
        this.allergies = allergies;
    }
}
