package com.ase.project.nutri_fit_app.repo;

import com.ase.project.nutri_fit_app.model.Users;
import com.ase.project.nutri_fit_app.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<Users, UUID> {

    Users findByUsername(String username);

    boolean existsByUsername(String username);


}


