package com.ase.project.nutri_fit_app.dto;

import com.ase.project.nutri_fit_app.model.Users;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

public class MealUpdateDto {

    private String mealName;
    private Double calories;
    private Double proteins;
    private Double fats;
    private Double carbs;
    private Double fibre;

    public MealUpdateDto(String mealName, double calories, double proteins, double fats, double carbs, double fibre) {
        this.mealName = mealName;
        this.calories = calories;
        this.proteins = proteins;
        this.fats = fats;
        this.carbs = carbs;
        this.fibre = fibre;
    }

    public MealUpdateDto() {
    }

    public String getMealName() {
        return mealName;
    }

    public void setMealName(String mealName) {
        this.mealName = mealName;
    }

    public Double getCalories() {
        return calories;
    }

    public void setCalories(double calories) {
        this.calories = calories;
    }

    public Double getProteins() {
        return proteins;
    }

    public void setProteins(double proteins) {
        this.proteins = proteins;
    }

    public Double getFats() {
        return fats;
    }

    public void setFats(double fats) {
        this.fats = fats;
    }

    public Double getCarbs() {
        return carbs;
    }

    public void setCarbs(double carbs) {
        this.carbs = carbs;
    }

    public Double getFibre() {
        return fibre;
    }

    public void setFibre(double fibre) {
        this.fibre = fibre;
    }
}
