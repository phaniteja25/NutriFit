package com.ase.project.nutri_fit_app.controller;


import com.ase.project.nutri_fit_app.config.JwtUtils;
import com.ase.project.nutri_fit_app.dto.UpdateUserInfoDto;
import com.ase.project.nutri_fit_app.dto.UserInfoDto;
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
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserInfoService userInfoService;

    @Autowired
    private JwtUtils jwtUtils;



    @PostMapping("/signup")
    public ResponseEntity<String> user_signup(@RequestBody UserSignUpDto userSignUpDto){

        try{


            if(userService.checkIfUsernameExists(userSignUpDto.getUsername())){
                return new ResponseEntity<>("Username already exists!", HttpStatus.BAD_REQUEST);

            }

            NutritionalInfoCalcluator nutritionalInfoCalcluator = new NutritionalInfoCalcluator(userSignUpDto.getHeight(),userSignUpDto.getWeight(),userSignUpDto.getAge(),userSignUpDto.getGender(),userSignUpDto.getActivity_level(),userSignUpDto.getGoal());

            double total_cal_intake = nutritionalInfoCalcluator.calc_calorie();
            double proteins_intake = nutritionalInfoCalcluator.calc_proteins();
            double fats_intake = nutritionalInfoCalcluator.calc_fats();
            double carbs_intake = nutritionalInfoCalcluator.calc_carbs();

            UserInfo userInfo = new UserInfo(userSignUpDto.getHeight(),userSignUpDto.getWeight(),userSignUpDto.getAge(),userSignUpDto.getGender(),userSignUpDto.getActivity_level(),userSignUpDto.getGoal(),total_cal_intake,proteins_intake,fats_intake,carbs_intake);

            UserInfo userInfo1 = userInfoService.save_user_info(userInfo);

            Users user = new Users();
            user.setUsername(userSignUpDto.getUsername());
            user.setEmail(userSignUpDto.getEmail());
            user.setPassword(userSignUpDto.getPassword());
            user.setUserInfo(userInfo);


            Users signedup_user = userService.register(user);



            return new  ResponseEntity<String>("User registered successfully",HttpStatus.CREATED);
        }
        catch (Exception e){
            return new ResponseEntity<>("Exception occured"+e,HttpStatus.BAD_REQUEST);
        }

    }

//    @PostMapping("/login")
//    public ResponseEntity<String> user_login(@RequestBody UserLoginDto userLoginDto){
//        try{
//            System.out.println(userLoginDto.toString());
//            if(userService.login(userLoginDto.getEmail(), userLoginDto.getPassword())){
//                return new ResponseEntity<>("Log in Successfull",HttpStatus.ACCEPTED);
//            }
//            else{
//                return new ResponseEntity<>("Wrong Password! Please Try Again",HttpStatus.ACCEPTED);
//
//            }
//        }
//
//        catch (Exception e){
//            return new ResponseEntity<>("Exception occured"+e,HttpStatus.BAD_REQUEST);
//
//        }
//    }


    // endpoint for profile dashboard
    @GetMapping("/userinfo")
    public ResponseEntity<UserInfoDto> user_info(@RequestHeader("Authorization") String token ) {
        UserInfoDto userInfoDto = null;
        try {
            String username = jwtUtils.extractUsername(token.substring(7)); // Remove "Bearer " prefix


            userInfoDto = userService.get_user_info(username);

            return new ResponseEntity<>(userInfoDto, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(userInfoDto, HttpStatus.BAD_REQUEST);

        }
    }

    @PutMapping("/update_user_info")
    public ResponseEntity<UserInfoDto> update_info(@RequestHeader("Authorization") String token,@RequestBody UpdateUserInfoDto updateUserInfoDto){

        String username = jwtUtils.extractUsername(token.substring(7)); // Remove "Bearer " prefix
        UserInfoDto userInfoDto = null;
        try {
             userInfoDto = userService.update_user_info(username, updateUserInfoDto);
        }
        catch (Exception e){
            System.out.println("Exception occured"+e);
        }

        return ResponseEntity.ok(userInfoDto);

    }






}
