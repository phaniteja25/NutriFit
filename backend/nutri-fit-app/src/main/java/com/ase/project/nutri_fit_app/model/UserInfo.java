package com.ase.project.nutri_fit_app.model;


import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "user_info")
public class UserInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
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

    @OneToOne(mappedBy = "userInfo")
    private Users users;

    public UserInfo(double height, double weight, int age, String gender, String activity_level, String goal, double total_cal_intake, double reqd_protein, double reqd_fat, double reqd_carbs) {
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

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
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

    public UUID getUser_info_id() {
        return id;
    }

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }

    public void setUser_info_id(UUID id) {
        this.id = id;
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

    @Override
    public String toString() {
        return "UserInfo{" +
                "id=" + id +
                ", height=" + height +
                ", weight=" + weight +
                ", age=" + age +
                ", gender='" + gender + '\'' +
                ", activity_level='" + activity_level + '\'' +
                ", goal='" + goal + '\'' +
                ", total_cal_intake=" + total_cal_intake +
                ", reqd_protein=" + reqd_protein +
                ", reqd_fat=" + reqd_fat +
                ", reqd_carbs=" + reqd_carbs +
                ", users=" + users +
                '}';
    }
}
