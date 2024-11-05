package com.ase.project.nutri_fit_app.repo;

import com.ase.project.nutri_fit_app.model.MealPlan;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Pageable;

public interface MealPlanRepository extends JpaRepository<MealPlan, UUID> {

    @Query("SELECT mp FROM MealPlan mp WHERE mp.user.user_id = :userId ORDER BY mp.createdAt DESC")
    List<MealPlan> findAllByUserOrderByCreatedAtDesc(@Param("userId") UUID userId);




}
