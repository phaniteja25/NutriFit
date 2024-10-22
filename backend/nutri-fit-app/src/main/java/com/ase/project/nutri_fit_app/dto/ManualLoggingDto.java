package com.ase.project.nutri_fit_app.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class ManualLoggingDto {

    private Double calories;
    private Double carbs;
    private Double fats;

    private  Double fibre;

    private  String meal_name;

    private Double proteins;

    private Double serving_size;

    public ManualLoggingDto(Double calories, Double carbs, Double fats, Double fibre, String meal_name, Double proteins, Double serving_size) {
        this.calories = calories;
        this.carbs = carbs;
        this.fats = fats;
        this.fibre = fibre;
        this.meal_name = meal_name;
        this.proteins = proteins;
        this.serving_size = serving_size;
    }

    public ManualLoggingDto() {
    }

    public Double getCalories() {
        return calories;
    }

    public void setCalories(Double calories) {
        this.calories = calories;
    }

    public Double getCarbs() {
        return carbs;
    }

    public void setCarbs(Double carbs) {
        this.carbs = carbs;
    }

    public Double getFats() {
        return fats;
    }

    public void setFats(Double fats) {
        this.fats = fats;
    }

    public Double getFibre() {
        return fibre;
    }

    public void setFibre(Double fibre) {
        this.fibre = fibre;
    }

    public String getMeal_name() {
        return meal_name;
    }

    public void setMeal_name(String meal_name) {
        this.meal_name = meal_name;
    }

    public Double getProteins() {
        return proteins;
    }

    public void setProteins(Double proteins) {
        this.proteins = proteins;
    }

    public Double getServing_size() {
        return serving_size;
    }

    public void setServing_size(Double serving_size) {
        this.serving_size = serving_size;
    }
}
