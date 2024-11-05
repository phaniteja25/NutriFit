package com.ase.project.nutri_fit_app.service;


import com.ase.project.nutri_fit_app.dto.DayMealDto;
import com.ase.project.nutri_fit_app.dto.DayMealInfoDto;
import com.ase.project.nutri_fit_app.dto.MealPlanRequestDto;
import com.ase.project.nutri_fit_app.dto.MealPlanResponseDto;
import com.ase.project.nutri_fit_app.model.DayMeal;
import com.ase.project.nutri_fit_app.model.DayMealInfo;
import com.ase.project.nutri_fit_app.model.MealPlan;
import com.ase.project.nutri_fit_app.model.Users;
import com.ase.project.nutri_fit_app.repo.MealPlanRepository;
import com.ase.project.nutri_fit_app.repo.UserRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.swing.text.IconView;
//import java.awt.print.Pageable;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class MealPlanService {

    @Autowired
    private MealPlanRepository mealPlanRepository;

    @Autowired
    private UserRepository userRepository;


    public MealPlanResponseDto saveMealPlan(String username,MealPlanResponseDto mealPlanResponseDto){

        Users users = userRepository.findByUsername(username);
        MealPlan mealPlan = new MealPlan();
        mealPlan.setStartDate(LocalDate.now());
        mealPlan.setUsers(users);

        List<DayMeal> dayMeals = new ArrayList<>();

        int dayNumber = 1;
        for (DayMealDto dayMealDto : mealPlanResponseDto.getMealPlan()){

            DayMeal dayMeal = new DayMeal();
            dayMeal.setDayNumber(dayNumber++);
            dayMeal.setMealPlan(mealPlan);


            List<DayMealInfo> dayMealInfos = new ArrayList<>();

            for(DayMealInfoDto dayMealInfoDto : dayMealDto.getMeals()){

                DayMealInfo dayMealInfo = new DayMealInfo();

                dayMealInfo.setMealType(dayMealInfoDto.getType());
                dayMealInfo.setDescription(dayMealInfoDto.getName());
                dayMealInfo.setProtein(Double.parseDouble(dayMealInfoDto.getProtein().replace("g", "")));
                dayMealInfo.setCarbs(Double.parseDouble(dayMealInfoDto.getCarbs().replace("g", "")));
                dayMealInfo.setFat(Double.parseDouble(dayMealInfoDto.getFat().replace("g", "")));
                dayMealInfo.setCalories(Double.parseDouble(dayMealInfoDto.getCalories().replace("g", "")));
                dayMealInfo.setDayMeal(dayMeal);
                dayMealInfos.add(dayMealInfo);

            }

            dayMeal.setMeals(dayMealInfos);
            dayMeals.add(dayMeal);





        }

        mealPlan.setDays(dayMeals);

        try {
            mealPlanRepository.save(mealPlan);
        }
        catch (Exception e){
            System.out.println("Error occured"+e);
        }
        return mealPlanResponseDto;

    }


    public MealPlanResponseDto getMealPlanDB(String username) throws Exception {
        Users users = userRepository.findByUsername(username);
        List<MealPlan> mealPlans = mealPlanRepository.findAllByUserOrderByCreatedAtDesc(users.getUser_id());


        MealPlan latestMealPlan = mealPlans.isEmpty() ? null : mealPlans.get(0);

        MealPlanResponseDto mealPlanResponseDto = null;
        if(latestMealPlan!=null){
             mealPlanResponseDto = convertToDto(latestMealPlan);
        }
        else{
            throw  new Exception("No meal plan found for the user");
        }
        return mealPlanResponseDto;

    }

    private MealPlanResponseDto convertToDto(MealPlan mealPlan) {

        MealPlanResponseDto dto = new MealPlanResponseDto();

        List<DayMealDto> dayMealDtos = new ArrayList<>();

        for(DayMeal dayMeal : mealPlan.getDays()){

            DayMealDto dayMealDto = new DayMealDto();
            dayMealDto.setDay("Day "+dayMeal.getDayNumber());

            List<DayMealInfoDto> dayMealInfoDTOs = new ArrayList<>();

            for (DayMealInfo mealInfo : dayMeal.getMeals()) {
                DayMealInfoDto mealInfoDto = new DayMealInfoDto();
                mealInfoDto.setType(mealInfo.getMealType());
                mealInfoDto.setName(mealInfo.getDescription());
                mealInfoDto.setProtein(""+mealInfo.getProtein());
                mealInfoDto.setCarbs(""+mealInfo.getCarbs());
                mealInfoDto.setFat(""+mealInfo.getFat());
                mealInfoDto.setCalories(""+ mealInfo.getCalories());
                dayMealInfoDTOs.add(mealInfoDto);
            }

            dayMealDto.setMeals(dayMealInfoDTOs);
            dayMealDtos.add(dayMealDto);


        }

        dto.setMealPlan(dayMealDtos);
        return dto;




    }
}
