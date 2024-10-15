package com.ase.project.nutri_fit_app.service;

import com.ase.project.nutri_fit_app.dto.UserInfoDto;
import com.ase.project.nutri_fit_app.model.UserInfo;
import com.ase.project.nutri_fit_app.model.Users;
import com.ase.project.nutri_fit_app.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Users register(Users user){

        if (checkIfUsernameExists(user.getUsername())) {
            throw new IllegalArgumentException("Username already exists!");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);

    }

    public boolean checkIfUsernameExists(String username){
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

    public UserInfoDto get_user_info(String username){

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
}
