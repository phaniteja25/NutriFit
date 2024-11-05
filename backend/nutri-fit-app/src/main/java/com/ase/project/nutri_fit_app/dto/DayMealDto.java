package com.ase.project.nutri_fit_app.dto;

import com.ase.project.nutri_fit_app.model.DayMealInfo;

import java.util.List;

public class DayMealDto {
    private String day;
    private List<DayMealInfoDto> meals;


    public DayMealDto(String day, List<DayMealInfoDto> meals) {
        this.day = day;
        this.meals = meals;
    }


    public DayMealDto() {
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public List<DayMealInfoDto> getMeals() {
        return meals;
    }

    public void setMeals(List<DayMealInfoDto> meals) {
        this.meals = meals;
    }
}
