package com.ase.project.nutri_fit_app.service;

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
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);

    }

    public boolean login(String email,String password){
        Users currUser = userRepo.findByEmail(email);

        if(currUser != null && passwordEncoder.matches(password,currUser.getPassword())){
            return true;
        }
        else{
            return false;
        }
    }


    public boolean isEmailAlreadyInUse(String email) {
        Users existingUser = userRepo.findByEmail(email);
        if(existingUser!= null){
            return true;
        }
        else{
            return false;
        }
    }

}
