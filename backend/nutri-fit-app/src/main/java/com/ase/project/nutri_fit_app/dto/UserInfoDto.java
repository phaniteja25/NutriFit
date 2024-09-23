package com.ase.project.nutri_fit_app.dto;

public class UserInfoDto {

    private String username;
    private String email;

    private double height;
    private double weight;
    private int age;
    private String gender;

    private String activity_level;

    private String goal;

    private double total_cal_intake;

    private double reqd_protein;


    private double reqd_fat;

    private double reqd_carbs;

    public UserInfoDto(String username, String email,  double height, double weight, int age, String gender, String activity_level, String goal, double total_cal_intake, double reqd_protein, double reqd_fat, double reqd_carbs) {
        this.username = username;
        this.email = email;

        this.height = height;
        this.weight = weight;
        this.age = age;
        this.gender = gender;
        this.activity_level = activity_level;
        this.goal = goal;
        this.total_cal_intake = total_cal_intake;
        this.reqd_protein = reqd_protein;
        this.reqd_fat = reqd_fat;
        this.reqd_carbs = reqd_carbs;
    }

    public UserInfoDto() {
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

    public double getTotal_cal_intake() {
        return total_cal_intake;
    }

    public void setTotal_cal_intake(double total_cal_intake) {
        this.total_cal_intake = total_cal_intake;
    }

    public double getReqd_protein() {
        return reqd_protein;
    }

    public void setReqd_protein(double reqd_protein) {
        this.reqd_protein = reqd_protein;
    }

    public double getReqd_fat() {
        return reqd_fat;
    }

    public void setReqd_fat(double reqd_fat) {
        this.reqd_fat = reqd_fat;
    }

    public double getReqd_carbs() {
        return reqd_carbs;
    }

    public void setReqd_carbs(double reqd_carbs) {
        this.reqd_carbs = reqd_carbs;
    }
}
