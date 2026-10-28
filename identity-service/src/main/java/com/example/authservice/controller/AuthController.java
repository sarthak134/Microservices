package com.example.authservice.controller;

import com.example.authservice.dto.AuthRequest;
import com.example.authservice.entity.UserCredential;
import com.example.authservice.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService service;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public String addNewUser(@RequestBody UserCredential user) {
        return service.saveUser(user);
    }

//    @PostMapping("/token")
//    public String getToken(@RequestBody AuthRequest authRequest) {
//        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
//        if (authenticate.isAuthenticated()) {
//            return service.generateToken(authRequest.getUsername());
//        } else {
//            throw new RuntimeException("invalid access");
//        }
//    }
    @PostMapping("/token")
    public ResponseEntity<String> getToken(@RequestBody AuthRequest authRequest) {
        System.out.println(">>> AUTH TOKEN CONTROLLER REACHED");

        try {
            Authentication authenticate =
                authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                        authRequest.getUsername(),
                        authRequest.getPassword()
                    )
                );

            String token = service.generateToken(authRequest.getUsername());
            return ResponseEntity.ok(token);

        } catch (Exception e) {
            System.out.println(">>> AUTH FAILED: " + e.getClass().getName() + " - " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials: " + e.getMessage());
        }
    }

    @GetMapping("/validate")
    public String validateToken(@RequestParam("token") String token) {
        service.validateToken(token);
        return "Token is valid";
    }
}
