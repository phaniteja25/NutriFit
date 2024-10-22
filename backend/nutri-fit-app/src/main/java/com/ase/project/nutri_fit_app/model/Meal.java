package com.ase.project.nutri_fit_app.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

@Entity
public class Meal {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID mealID;


    @ManyToOne
    @JoinColumn(name = "user_id",nullable = false)
    @JsonBackReference
    private  Users user;

    private String mealName;
    private double calories;
    private double proteins;
    private double fats;
    private double carbs;

    private double fibre;

    private LocalDate log_date;

    private LocalDateTime log_time;

    public LocalDate getLog_date() {
        return log_date;
    }

    public void setLog_date(LocalDate log_date) {
        this.log_date = log_date;
    }

    public LocalDateTime getLog_time() {
        return log_time;
    }

    public void setLog_time(LocalDateTime log_time) {
        this.log_time = log_time;
    }

    public void setFats(double fats) {
        this.fats = fats;
    }

    public double getFibre() {
        return fibre;
    }

    public void setFibre(double fibre) {
        this.fibre = fibre;
    }

    private double serving_size;

    public Meal() {
    }

    public Meal(UUID mealID, Users user, String mealName, double calories, double proteins, double fats, double carbs, double fibre, LocalDate log_date, LocalDateTime log_time, double serving_size) {
        this.mealID = mealID;
        this.user = user;
        this.mealName = mealName;
        this.calories = calories;
        this.proteins = proteins;
        this.fats = fats;
        this.carbs = carbs;
        this.fibre = fibre;
        this.log_date = log_date;
        this.log_time = log_time;
        this.serving_size = serving_size;
    }

    public double getServing_size() {
        return serving_size;
    }

    public void setServing_size(double serving_size) {
        this.serving_size = serving_size;
    }

    public UUID getMealID() {
        return mealID;
    }

    public void setMealID(UUID mealID) {
        this.mealID = mealID;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public String getMealName() {
        return mealName;
    }

    public void setMealName(String mealName) {
        this.mealName = mealName;
    }

    public double getCalories() {
        return calories;
    }

    public void setCalories(double calories) {
        this.calories = calories;
    }

    public double getProteins() {
        return proteins;
    }

    public void setProteins(double proteins) {
        this.proteins = proteins;
    }

    public double getFats() {
        return fats;
    }

    public void setFats(int fats) {
        this.fats = fats;
    }

    public double getCarbs() {
        return carbs;
    }

    public void setCarbs(double carbs) {
        this.carbs = carbs;
    }

    @Override
    public String toString() {
        return "Meal{" +
                "mealID=" + mealID +
                ", user=" + user +
                ", mealName='" + mealName + '\'' +
                ", calories=" + calories +
                ", proteins=" + proteins +
                ", fats=" + fats +
                ", carbs=" + carbs +
                ", fibre=" + fibre +
                ", log_date=" + log_date +
                ", log_time=" + log_time +
                ", serving_size=" + serving_size +
                '}';
    }
}
