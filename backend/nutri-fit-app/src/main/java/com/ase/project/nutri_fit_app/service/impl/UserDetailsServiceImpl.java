package com.ase.project.nutri_fit_app.service.impl;

import com.ase.project.nutri_fit_app.model.Users;
import com.ase.project.nutri_fit_app.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl  implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Users user = userRepository.findByUsername(username);



        if(user==null){
            System.out.println("User Not found Exception");
            throw  new UsernameNotFoundException("No user found");
        }
        else{
            return user;
        }

    }
}


