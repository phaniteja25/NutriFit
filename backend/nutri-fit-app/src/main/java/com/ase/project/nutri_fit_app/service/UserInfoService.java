package com.ase.project.nutri_fit_app.service;


import com.ase.project.nutri_fit_app.exception.DatabaseConnectionException;
import com.ase.project.nutri_fit_app.model.UserInfo;
import com.ase.project.nutri_fit_app.repo.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.stereotype.Service;

@Service
public class UserInfoService {

    @Autowired
    private UserInfoRepository userInfoRepository;


    public UserInfo save_user_info(UserInfo userInfo){
        try {

            return userInfoRepository.save(userInfo);
        }
        catch (JpaSystemException ex){
            throw new DatabaseConnectionException("Database Connection error"+ex);
        }

    }
}
