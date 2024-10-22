package com.ase.project.nutri_fit_app.dto;

import com.ase.project.nutri_fit_app.model.Meal;

import java.time.LocalDate;
import java.util.List;

public class AllMealsByDateResponseDto {

    private LocalDate   date;
    private List<Meal> meals;

    public AllMealsByDateResponseDto(LocalDate date, List<Meal> meals) {
        this.date = date;
        this.meals = meals;
    }

    // Getters and Setters
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public List<Meal> getMeals() { return meals; }
    public void setMeals(List<Meal> meals) { this.meals = meals; }
}
