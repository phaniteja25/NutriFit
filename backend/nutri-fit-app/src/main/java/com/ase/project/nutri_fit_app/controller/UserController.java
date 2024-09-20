package com.ase.project.nutri_fit_app.controller;


import com.ase.project.nutri_fit_app.dto.UserLoginDto;
import com.ase.project.nutri_fit_app.dto.UserSignUpDto;
import com.ase.project.nutri_fit_app.model.UserInfo;
import com.ase.project.nutri_fit_app.model.Users;
import com.ase.project.nutri_fit_app.model.Users;
import com.ase.project.nutri_fit_app.service.UserInfoService;
import com.ase.project.nutri_fit_app.service.UserService;
import com.ase.project.nutri_fit_app.util.NutritionalInfoCalcluator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserInfoService userInfoService;



    @PostMapping("/signup")
    public ResponseEntity<String> user_signup(@RequestBody UserSignUpDto userSignUpDto){

        try{
            if(userService.isEmailAlreadyInUse(userSignUpDto.getEmail())){
                return new  ResponseEntity<String>("Account already created! Please Sign In",HttpStatus.ACCEPTED);

            }

            NutritionalInfoCalcluator nutritionalInfoCalcluator = new NutritionalInfoCalcluator(userSignUpDto.getHeight(),userSignUpDto.getWeight(),userSignUpDto.getAge(),userSignUpDto.getGender(),userSignUpDto.getActivity_level(),userSignUpDto.getActivity_level());

            double total_cal_intake = nutritionalInfoCalcluator.calc_calorie();
            double proteins_intake = nutritionalInfoCalcluator.calc_proteins();
            double fats_intake = nutritionalInfoCalcluator.calc_fats();
            double carbs_intake = nutritionalInfoCalcluator.calc_carbs();

            UserInfo userInfo = new UserInfo(userSignUpDto.getHeight(),userSignUpDto.getWeight(),userSignUpDto.getAge(),userSignUpDto.getGender(),userSignUpDto.getActivity_level(),userSignUpDto.getGoal(),total_cal_intake,proteins_intake,fats_intake,carbs_intake);

            UserInfo userInfo1 = userInfoService.save_user_info(userInfo);

            Users user  = new Users(userSignUpDto.getUsername(),userSignUpDto.getEmail(),userSignUpDto.getPassword(),userInfo);

            Users signedup_user = userService.register(user);



            return new  ResponseEntity<String>("User registered successfully",HttpStatus.CREATED);
        }
        catch (Exception e){
            return new ResponseEntity<>("Exception occured"+e,HttpStatus.BAD_REQUEST);
        }

    }

    @PostMapping("/login")
    public ResponseEntity<String> user_login(@RequestBody UserLoginDto userLoginDto){
        try{
            System.out.println(userLoginDto.toString());
            if(userService.login(userLoginDto.getEmail(), userLoginDto.getPassword())){
                return new ResponseEntity<>("Log in Successfull",HttpStatus.ACCEPTED);
            }
            else{
                return new ResponseEntity<>("Wrong Password! Please Try Again",HttpStatus.ACCEPTED);

            }
        }

        catch (Exception e){
            return new ResponseEntity<>("Exception occured"+e,HttpStatus.BAD_REQUEST);

        }
    }
}
