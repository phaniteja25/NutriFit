package com.ase.project.nutri_fit_app.repo;

import com.ase.project.nutri_fit_app.dto.TotalNutritionalInfo;
import com.ase.project.nutri_fit_app.model.Meal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface MealRepository  extends JpaRepository<Meal, UUID> {

    @Query("SELECT m FROM Meal m WHERE m.user.username = :username AND m.log_date = :currentDate")
    List<Meal> findMealsByUsernameAndDate(@Param("username") String username, @Param("currentDate") LocalDate currentDate);

    @Query("SELECT m FROM Meal m WHERE m.user.username = :username AND m.mealID = :mealID")
    Meal findMealByUsernameAndMealID(@Param("username") String username, @Param("mealID") UUID mealID);

    @Query("SELECT new com.ase.project.nutri_fit_app.dto.TotalNutritionalInfo(SUM(m.calories), SUM(m.proteins), SUM(m.carbs), SUM(m.fats), SUM(m.fibre))" +
            "FROM Meal m WHERE m.user.username = :username AND m.log_date = :date")
    TotalNutritionalInfo getTotalNutritionalInfoForDay(@Param("username") String username, @Param("date") LocalDate date);

    @Query("SELECT m FROM Meal m WHERE m.user.username = :username ORDER BY m.log_date DESC")
    List<Meal> findAllByUsernameOrderByDate(@Param("username") String username);


}


