package com.ase.project.nutri_fit_app.controller;


import com.ase.project.nutri_fit_app.dto.UserLoginDto;
import com.ase.project.nutri_fit_app.model.Users;
import com.ase.project.nutri_fit_app.model.Users;
import com.ase.project.nutri_fit_app.service.UserService;
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

    @PostMapping("/signup")
    public ResponseEntity<String> user_signup(@RequestBody Users user ){

        try{
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
