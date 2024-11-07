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
    public ResponseEntity<String> userSignup(@RequestBody UserSignUpDto userSignUpDto) {
        try {
            // Check if the username already exists
            if (userService.checkIfUsernameExists(userSignUpDto.getUsername())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Username already exists!");
            }

            // Calculate nutritional information based on user details
            NutritionalInfoCalcluator nutritionalInfoCalcluator = new NutritionalInfoCalcluator(
                    userSignUpDto.getHeight(),
                    userSignUpDto.getWeight(),
                    userSignUpDto.getAge(),
                    userSignUpDto.getGender(),
                    userSignUpDto.getActivity_level(),
                    userSignUpDto.getGoal()
            );

            double totalCalIntake = nutritionalInfoCalcluator.calc_calorie();
            double proteinsIntake = nutritionalInfoCalcluator.calc_proteins();
            double fatsIntake = nutritionalInfoCalcluator.calc_fats();
            double carbsIntake = nutritionalInfoCalcluator.calc_carbs();

            // Create UserInfo object and save it
            UserInfo userInfo = new UserInfo(
                    userSignUpDto.getHeight(),
                    userSignUpDto.getWeight(),
                    userSignUpDto.getAge(),
                    userSignUpDto.getGender(),
                    userSignUpDto.getActivity_level(),
                    userSignUpDto.getGoal(),
                    totalCalIntake,
                    proteinsIntake,
                    fatsIntake,
                    carbsIntake
            );

            UserInfo savedUserInfo = userInfoService.save_user_info(userInfo);

            // Create and save Users object
            Users user = new Users();
            user.setUsername(userSignUpDto.getUsername());
            user.setEmail(userSignUpDto.getEmail());
            user.setPassword(userSignUpDto.getPassword());
            user.setUserInfo(savedUserInfo);

            Users signedUpUser = userService.register(user);

            // Return 201 Created if the user is registered successfully
            return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");

        } catch (IllegalArgumentException e) {
            // Return 400 Bad Request for any validation or input-related issues
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid input data: " + e.getMessage());
        } catch (Exception e) {
            // Log the exception for debugging
            System.out.println("Exception occurred: " + e);

            // Return 500 Internal Server Error for any unexpected server issues
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred during registration.");
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
    public ResponseEntity<?> userInfo(@RequestHeader("Authorization") String token) {
        try {
            // Check if token is present and valid
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Authorization token is missing or invalid.");
            }

            String username = jwtUtils.extractUsername(token.substring(7)); // Remove "Bearer " prefix
            UserInfoDto userInfoDto = userService.get_user_info(username);

            if (userInfoDto == null) {
                // Return 404 if user information is not found
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("User information not found.");
            }

            // Return 200 OK with user information
            return ResponseEntity.ok(userInfoDto);

        } catch (IllegalArgumentException e) {
            // Return 400 Bad Request for invalid data
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid request data.");
        } catch (Exception e) {
            // Log the exception for debugging
            System.out.println("Exception occurred: " + e);

            // Return 500 Internal Server Error for any other unexpected issues
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while retrieving user information.");
        }
    }

    @PutMapping("/update_user_info")
    public ResponseEntity<?> updateInfo(@RequestHeader("Authorization") String token, @RequestBody UpdateUserInfoDto updateUserInfoDto) {
        try {
            // Check if token is present and valid
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Authorization token is missing or invalid.");
            }

            String username = jwtUtils.extractUsername(token.substring(7)); // Remove "Bearer " prefix
            UserInfoDto userInfoDto = userService.update_user_info(username, updateUserInfoDto);

            if (userInfoDto == null) {
                // Return 404 if user information is not found or couldn't be updated
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("User information not found or could not be updated.");
            }

            // Return 200 OK with the updated user information
            return ResponseEntity.ok(userInfoDto);

        } catch (IllegalArgumentException e) {
            // Return 400 Bad Request for invalid input data
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid input data provided for updating user information.");
        } catch (Exception e) {
            // Log the exception for debugging
            System.out.println("Exception occurred: " + e);

            // Return 500 Internal Server Error for any unexpected issues
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while updating user information.");
        }
    }







}
