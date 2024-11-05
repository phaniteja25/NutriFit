package com.ase.project.nutri_fit_app.controller;


import com.ase.project.nutri_fit_app.config.JwtUtils;
import com.ase.project.nutri_fit_app.dto.MealPlanRequestDto;
import com.ase.project.nutri_fit_app.dto.MealPlanResponseDto;
import com.ase.project.nutri_fit_app.service.GeminiApiService;
import com.ase.project.nutri_fit_app.service.MealPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/mealPlan")
public class MealPlanController {
    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private GeminiApiService geminiApiService;

    @Autowired
    private MealPlanService mealPlanService;

    @PostMapping("/create")
    public ResponseEntity<MealPlanResponseDto> create(@RequestHeader("Authorization") String token, @RequestBody MealPlanRequestDto mealPlanRequestDto){

        String username = jwtUtils.extractUsername(token.substring(7)); // Remove "Bearer " prefix

        MealPlanResponseDto mealPlanResponseDto = null;
        mealPlanResponseDto = geminiApiService.getMealPlan(mealPlanRequestDto);

        mealPlanResponseDto = mealPlanService.saveMealPlan(username,mealPlanResponseDto);

        return ResponseEntity.ok(mealPlanResponseDto);

    }


    @GetMapping("/getmeals")
    public ResponseEntity<MealPlanResponseDto> getmeals(@RequestHeader("Authorization") String token){
        String username = jwtUtils.extractUsername(token.substring(7));

        MealPlanResponseDto mealPlanResponseDto = null;

        try {
            mealPlanResponseDto = mealPlanService.getMealPlanDB(username);
        }
        catch (Exception e){
            System.out.println("Could not load your meals"+e);
        }

        return ResponseEntity.ok(mealPlanResponseDto);


    }

}
