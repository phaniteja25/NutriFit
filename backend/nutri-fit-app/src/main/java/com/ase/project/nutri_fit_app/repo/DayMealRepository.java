package com.ase.project.nutri_fit_app.repo;

import com.ase.project.nutri_fit_app.model.DayMeal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface DayMealRepository extends JpaRepository<DayMeal, UUID> {

}
