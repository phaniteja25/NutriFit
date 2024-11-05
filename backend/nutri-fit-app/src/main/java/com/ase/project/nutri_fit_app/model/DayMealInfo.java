package com.ase.project.nutri_fit_app.model;


import jakarta.persistence.*;

import java.util.UUID;

@Entity
public class DayMealInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String mealType;

    private String description;

    private double protein;
    private double carbs;
    private double fat;
    private double calories;


    @ManyToOne
    @JoinColumn(name="day_meal_id")
    private DayMeal dayMeal;

    public DayMealInfo(UUID id, String mealType, String description, double protein, double carbs, double fat, double calories, DayMeal dayMeal) {
        this.id = id;
        this.mealType = mealType;
        this.description = description;
        this.protein = protein;
        this.carbs = carbs;
        this.fat = fat;
        this.calories = calories;
        this.dayMeal = dayMeal;
    }

    public DayMealInfo() {
    }


    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getMealType() {
        return mealType;
    }

    public void setMealType(String mealType) {
        this.mealType = mealType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getProtein() {
        return protein;
    }

    public void setProtein(double protein) {
        this.protein = protein;
    }

    public double getCarbs() {
        return carbs;
    }

    public void setCarbs(double carbs) {
        this.carbs = carbs;
    }

    public double getFat() {
        return fat;
    }

    public void setFat(double fat) {
        this.fat = fat;
    }

    public double getCalories() {
        return calories;
    }

    public void setCalories(double calories) {
        this.calories = calories;
    }

    public DayMeal getDayMeal() {
        return dayMeal;
    }

    public void setDayMeal(DayMeal dayMeal) {
        this.dayMeal = dayMeal;
    }
}
