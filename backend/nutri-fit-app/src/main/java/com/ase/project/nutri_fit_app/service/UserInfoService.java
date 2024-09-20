package com.ase.project.nutri_fit_app.service;


import com.ase.project.nutri_fit_app.model.UserInfo;
import com.ase.project.nutri_fit_app.repo.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserInfoService {

    @Autowired
    private UserInfoRepository userInfoRepository;

    public UserInfo save_user_info(UserInfo userInfo){


        return userInfoRepository.save(userInfo);

    }
}
