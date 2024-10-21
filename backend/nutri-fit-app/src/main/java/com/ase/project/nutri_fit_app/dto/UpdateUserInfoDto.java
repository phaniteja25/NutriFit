package com.ase.project.nutri_fit_app.dto;

public class UpdateUserInfoDto {


    private Double height;
    private Double weight;
    private int age;
    private String gender;

    private String activity_level;

    private String goal;

    private Double total_cal_intake;

    private Double reqd_protein;


    private Double reqd_fat;

    private Double reqd_carbs;

    public UpdateUserInfoDto(double height, double weight, int age, String gender, String activity_level, String goal, double total_cal_intake, double reqd_protein, double reqd_fat, double reqd_carbs) {
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

    public UpdateUserInfoDto() {
    }

    public Double getHeight() {
        return height;
    }

    public void setHeight(Double height) {
        this.height = height;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
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

    public Double getTotal_cal_intake() {
        return total_cal_intake;
    }

    public void setTotal_cal_intake(Double total_cal_intake) {
        this.total_cal_intake = total_cal_intake;
    }

    public Double getReqd_protein() {
        return reqd_protein;
    }

    public void setReqd_protein(Double reqd_protein) {
        this.reqd_protein = reqd_protein;
    }

    public Double getReqd_fat() {
        return reqd_fat;
    }

    public void setReqd_fat(Double reqd_fat) {
        this.reqd_fat = reqd_fat;
    }

    public Double getReqd_carbs() {
        return reqd_carbs;
    }

    public void setReqd_carbs(Double reqd_carbs) {
        this.reqd_carbs = reqd_carbs;
    }


}
