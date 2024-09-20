package com.ase.project.nutri_fit_app.dto;

public class UserSignUpDto {

    private String username;
    private String email;
    private String password;

    private double height;
    private double weight;
    private int age;
    private String gender;

    private String activity_level;

    private String goal;

    public UserSignUpDto(String username, String email, String password, double height, double weight, int age, String gender, String activity_level, String goal) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.height = height;
        this.weight = weight;
        this.age = age;
        this.gender = gender;
        this.activity_level = activity_level;
        this.goal = goal;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getActivity_level() {
        return activity_level;
    }

    public void setActivity_level(String activity_level) {
        this.activity_level = activity_level;
    }

    public String getGoal() {
        return goal;
    }

    public void setGoal(String goal) {
        this.goal = goal;
    }
}
