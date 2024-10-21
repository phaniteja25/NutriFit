package com.ase.project.nutri_fit_app.dto;

public class APIMealData {

    private String name;
    private double calories;
    private double serving_size_g;
    private double fat_total_g;
    private double fat_saturated_g;
    private double protein_g;
    private int sodium_mg;
    private int potassium_mg;
    private int cholesterol_mg;
    private double carbohydrates_total_g;
    private double fiber_g;
    private double sugar_g;

    public APIMealData() {
    }

    public APIMealData(String name, double calories, double serving_size_g, double fat_total_g, double fat_saturated_g, double protein_g, int sodium_mg, int potassium_mg, int cholesterol_mg, double carbohydrates_total_g, double fiber_g, double sugar_g) {
        this.name = name;
        this.calories = calories;
        this.serving_size_g = serving_size_g;
        this.fat_total_g = fat_total_g;
        this.fat_saturated_g = fat_saturated_g;
        this.protein_g = protein_g;
        this.sodium_mg = sodium_mg;
        this.potassium_mg = potassium_mg;
        this.cholesterol_mg = cholesterol_mg;
        this.carbohydrates_total_g = carbohydrates_total_g;
        this.fiber_g = fiber_g;
        this.sugar_g = sugar_g;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getCalories() {
        return calories;
    }

    public void setCalories(double calories) {
        this.calories = calories;
    }

    public double getServing_size_g() {
        return serving_size_g;
    }

    public void setServing_size_g(double serving_size_g) {
        this.serving_size_g = serving_size_g;
    }

    public double getFat_total_g() {
        return fat_total_g;
    }

    public void setFat_total_g(double fat_total_g) {
        this.fat_total_g = fat_total_g;
    }

    public double getFat_saturated_g() {
        return fat_saturated_g;
    }

    public void setFat_saturated_g(double fat_saturated_g) {
        this.fat_saturated_g = fat_saturated_g;
    }

    public double getProtein_g() {
        return protein_g;
    }

    public void setProtein_g(double protein_g) {
        this.protein_g = protein_g;
    }

    public int getSodium_mg() {
        return sodium_mg;
    }

    public void setSodium_mg(int sodium_mg) {
        this.sodium_mg = sodium_mg;
    }

    public int getPotassium_mg() {
        return potassium_mg;
    }

    public void setPotassium_mg(int potassium_mg) {
        this.potassium_mg = potassium_mg;
    }

    public int getCholesterol_mg() {
        return cholesterol_mg;
    }

    public void setCholesterol_mg(int cholesterol_mg) {
        this.cholesterol_mg = cholesterol_mg;
    }

    public double getCarbohydrates_total_g() {
        return carbohydrates_total_g;
    }

    public void setCarbohydrates_total_g(double carbohydrates_total_g) {
        this.carbohydrates_total_g = carbohydrates_total_g;
    }

    public double getFiber_g() {
        return fiber_g;
    }

    public void setFiber_g(double fiber_g) {
        this.fiber_g = fiber_g;
    }

    public double getSugar_g() {
        return sugar_g;
    }

    public void setSugar_g(double sugar_g) {
        this.sugar_g = sugar_g;
    }
}
