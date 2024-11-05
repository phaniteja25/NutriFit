package com.ase.project.nutri_fit_app.model;


import jakarta.persistence.*;

import java.util.List;
import java.util.UUID;

@Entity
public class DayMeal {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private int dayNumber;

    @ManyToOne
    @JoinColumn(name = "meal_plan_id")
    private MealPlan mealPlan;

    @OneToMany(mappedBy = "dayMeal", cascade = CascadeType.ALL)
    private List<DayMealInfo> meals;

    public DayMeal() {
    }

    public DayMeal(UUID id, int dayNumber, MealPlan mealPlan, List<DayMealInfo> meals) {
        this.id = id;
        this.dayNumber = dayNumber;
        this.mealPlan = mealPlan;
        this.meals = meals;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public int getDayNumber() {
        return dayNumber;
    }

    public void setDayNumber(int dayNumber) {
        this.dayNumber = dayNumber;
    }

    public MealPlan getMealPlan() {
        return mealPlan;
    }

    public void setMealPlan(MealPlan mealPlan) {
        this.mealPlan = mealPlan;
    }

    public List<DayMealInfo> getMeals() {
        return meals;
    }

    public void setMeals(List<DayMealInfo> meals) {
        this.meals = meals;
    }
}
