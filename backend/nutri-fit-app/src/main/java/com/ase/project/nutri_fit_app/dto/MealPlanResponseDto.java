package com.ase.project.nutri_fit_app.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class MealPlanResponseDto {


    private List<DayMealDto> mealPlan;

    public MealPlanResponseDto(List<DayMealDto> mealPlan) {
        this.mealPlan = mealPlan;
    }

    public MealPlanResponseDto() {
    }

    public List<DayMealDto> getMealPlan() {
        return mealPlan;
    }

    public void setMealPlan(List<DayMealDto> mealPlan) {
        this.mealPlan = mealPlan;
    }
}
