package com.ase.project.nutri_fit_app.service;

import com.ase.project.nutri_fit_app.dto.UpdateUserInfoDto;
import com.ase.project.nutri_fit_app.dto.UserInfoDto;
import com.ase.project.nutri_fit_app.model.UserInfo;
import com.ase.project.nutri_fit_app.model.Users;
import com.ase.project.nutri_fit_app.repo.UserRepository;
import com.ase.project.nutri_fit_app.util.NutritionalInfoCalcluator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private UserInfoService userInfoService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Users register(Users user) {

        if (checkIfUsernameExists(user.getUsername())) {
            throw new IllegalArgumentException("Username already exists!");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);

    }

    public boolean checkIfUsernameExists(String username) {
        return userRepo.existsByUsername(username);
    }


//    public boolean login(String email,String password){
//        Users currUser = userRepo.findByEmail(email);
//
//        if(currUser != null && passwordEncoder.matches(password,currUser.getPassword())){
//            return true;
//        }
//        else{
//            return false;
//        }
//    }

    public UserInfoDto get_user_info(String username) {

        Users currUser = userRepo.findByUsername(username);

        UserInfo userInfo = currUser.getUserInfo();

        UserInfoDto userInfoDto = new UserInfoDto();

        //setting the values
        userInfoDto.setHeight(userInfo.getHeight());
        userInfoDto.setWeight(userInfo.getWeight());
        userInfoDto.setAge(userInfo.getAge());
        userInfoDto.setGender(userInfo.getGender());
        userInfoDto.setActivity_level(userInfo.getActivity_level());
        userInfoDto.setGoal(userInfo.getGoal());
        userInfoDto.setTotal_cal_intake(userInfo.getTotal_cal_intake());
        userInfoDto.setReqd_carbs(userInfo.getReqd_carbs());
        userInfoDto.setReqd_protein(userInfo.getReqd_protein());
        userInfoDto.setReqd_fat(userInfo.getReqd_fat());
        userInfoDto.setUsername(currUser.getUsername());
        userInfoDto.setEmail(currUser.getEmail());

        return userInfoDto;


    }

    public UserInfoDto update_user_info(String username, UpdateUserInfoDto updateUserInfoDto) throws Exception {

        Users user = userRepo.findByUsername(username);

        UserInfo userInfo = user.getUserInfo();

        Double new_height = null;
        Double new_weight = null;
        int new_age = 0;
        String new_gender = null;
        String new_activity_level = null;
        String new_goal = null;
        Double new_reqd_protein = null;
        Double new_reqd_fat = null;
        Double new_reqd_carbs = null;


        if (updateUserInfoDto.getHeight() != null) {
            new_height = updateUserInfoDto.getHeight();
        } else {
            new_height = userInfo.getHeight();
        }
        if (updateUserInfoDto.getWeight() != null) {
            new_weight = updateUserInfoDto.getWeight();
        } else {
            new_weight = userInfo.getWeight();
        }

        if (updateUserInfoDto.getAge() > 0) {
            new_age = updateUserInfoDto.getAge();
        } else {
            new_age = userInfo.getAge();
        }

        if (updateUserInfoDto.getGender() != null) {
            new_gender = updateUserInfoDto.getGender();
        } else {
            new_gender = userInfo.getGender();
        }

        if (updateUserInfoDto.getActivity_level() != null) {
            new_activity_level = updateUserInfoDto.getActivity_level();
        } else {
            new_activity_level = userInfo.getActivity_level();
        }

        if (updateUserInfoDto.getGoal() != null) {
            new_goal = updateUserInfoDto.getGoal();
        } else {
            new_goal = userInfo.getGoal();
        }

        if (updateUserInfoDto.getReqd_protein() != null) {
            new_reqd_protein = updateUserInfoDto.getReqd_protein();
        } else {
            new_reqd_protein = userInfo.getReqd_protein();
        }

        if (updateUserInfoDto.getReqd_fat() != null) {
            new_reqd_fat = updateUserInfoDto.getReqd_fat();
        } else {
            new_reqd_fat = userInfo.getReqd_fat();
        }

        if (updateUserInfoDto.getReqd_carbs() != null) {
            new_reqd_carbs = updateUserInfoDto.getReqd_carbs();
        } else {
            new_reqd_carbs = userInfo.getReqd_carbs();
        }

        NutritionalInfoCalcluator calculator = new NutritionalInfoCalcluator(
                new_height, new_weight, new_age,
                new_gender, new_activity_level,new_goal
        );
        userInfo.setWeight(new_weight);
        userInfo.setHeight(new_height);
        userInfo.setAge(new_age);
        userInfo.setTotal_cal_intake(calculator.calc_calorie());
        userInfo.setReqd_protein(calculator.calc_proteins());
        userInfo.setReqd_fat(calculator.calc_fats());
        userInfo.setReqd_carbs(calculator.calc_carbs());

        // Ensure the relationship consistency (if needed)
        userInfo.setUsers(user); // Set the user back to UserInfo to maintain bidirectional consistency

        // Save the updated UserInfo
        userInfoService.save_user_info(userInfo);

        // Prepare and return UserInfoDto
        UserInfoDto userInfoDto = new UserInfoDto();
        userInfoDto.setUsername(user.getUsername());
        userInfoDto.setEmail(user.getEmail());
        userInfoDto.setHeight(userInfo.getHeight());
        userInfoDto.setWeight(userInfo.getWeight());
        userInfoDto.setAge(userInfo.getAge());
        userInfoDto.setGender(userInfo.getGender());
        userInfoDto.setActivity_level(userInfo.getActivity_level());
        userInfoDto.setGoal(userInfo.getGoal());
        userInfoDto.setTotal_cal_intake(userInfo.getTotal_cal_intake());
        userInfoDto.setReqd_protein(userInfo.getReqd_protein());
        userInfoDto.setReqd_fat(userInfo.getReqd_fat());
        userInfoDto.setReqd_carbs(userInfo.getReqd_carbs());

        System.out.println(userInfoDto.toString());

        return userInfoDto;
    }

}




