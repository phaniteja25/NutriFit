package com.ase.project.nutri_fit_app.repo;

import com.ase.project.nutri_fit_app.model.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserInfoRepository extends JpaRepository<UserInfo, UUID> {
}
