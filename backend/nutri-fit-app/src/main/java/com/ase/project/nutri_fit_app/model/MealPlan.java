package com.ase.project.nutri_fit_app.model;

import jakarta.persistence.*;
import jdk.dynalink.linker.LinkerServices;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
public class MealPlan {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID mealPlanID;

    private LocalDate startDate;


    @OneToMany(mappedBy = "mealPlan", cascade = CascadeType.ALL)
    private List<DayMeal> days;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private Users user;


    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt = new Date();  // Automatically set to current date/time on creation



    public MealPlan() {
    }


    public MealPlan(UUID mealPlanID, LocalDate startDate, List<DayMeal> days, Users user, Date createdAt ) {
        this.mealPlanID = mealPlanID;
        this.startDate = startDate;
        this.days = days;
        this.user = user;
        this.createdAt = createdAt;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public UUID getMealPlanID() {
        return mealPlanID;
    }

    public void setMealPlanID(UUID mealPlanID) {
        this.mealPlanID = mealPlanID;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public List<DayMeal> getDays() {
        return days;
    }

    public void setDays(List<DayMeal> days) {
        this.days = days;
    }

    public Users getUsers() {
        return user;
    }

    public void setUsers(Users user) {
        this.user = user;
    }
}
