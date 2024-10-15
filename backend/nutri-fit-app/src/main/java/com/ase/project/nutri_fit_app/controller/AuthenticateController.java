package com.ase.project.nutri_fit_app.controller;


import com.ase.project.nutri_fit_app.config.JwtUtils;
import com.ase.project.nutri_fit_app.model.JwtRequest;
import com.ase.project.nutri_fit_app.model.JwtResponse;
import com.ase.project.nutri_fit_app.service.impl.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class AuthenticateController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/generate-token")
    public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception {
        try {
            System.out.println(jwtRequest.getUsername()+" "+jwtRequest.getPassword());

            authenticate(jwtRequest.getUsername(), jwtRequest.getPassword());

        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Wrong Credentials");
        }

        UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(jwtRequest.getUsername());
        String token = jwtUtils.generateToken(userDetails);

        return new ResponseEntity<>(new JwtResponse(token), HttpStatus.OK);
    }

    private void authenticate(String username, String password) throws Exception {
        UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(username);
        System.out.println(userDetails.getUsername() +", "+ userDetails.getPassword());
        // Verify the password
        System.out.println("Stored Password "+userDetails.getPassword());
        System.out.println("Current Password "+password);


        System.out.println(passwordEncoder.matches(password, userDetails.getPassword()));

        if (passwordEncoder.matches(password, userDetails.getPassword())) {

            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(username,password);

            authenticationManager.authenticate(authToken);
        }
        else{
            throw new BadCredentialsException("Wrong Credentials");
        }

        // Create an authentication token


    }
}

