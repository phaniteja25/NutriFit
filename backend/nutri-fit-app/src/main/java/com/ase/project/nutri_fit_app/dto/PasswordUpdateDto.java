package com.ase.project.nutri_fit_app.dto;

public class PasswordUpdateDto {

    private String username;
    private String newPassword;


    public PasswordUpdateDto(String username, String newPassword) {
        this.username = username;
        this.newPassword = newPassword;
    }

    public PasswordUpdateDto() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
