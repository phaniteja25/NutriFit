package com.ase.project.nutri_fit_app.util;

public class NutritionalInfoCalcluator {


    private double height;
    private double weight;
    private int age;
    private String gender;

    private String activity_level;

    private String calorie_control;


    public NutritionalInfoCalcluator(double height, double weight, int age, String gender, String activity_level, String calorie_control) {
        this.height = height;
        this.weight = weight;
        this.age = age;
        this.gender = gender;
        this.activity_level = activity_level;
        this.calorie_control = calorie_control;

    }

    public String getActivity_level() {
        return activity_level;
    }

    public void setActivity_level(String activity_level) {
        this.activity_level = activity_level;
    }

    public String getCalorie_control() {
        return calorie_control;
    }

    public void setCalorie_control(String calorie_control) {
        this.calorie_control = calorie_control;
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(float height) {
        this.height = height;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(float weight) {
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


    @Override
    public String toString() {
        return "CalorieCalculator{" +
                "height=" + height +
                ", weight=" + weight +
                ", age=" + age +
                ", gender='" + gender + '\'' +
                '}';
    }


    public double calc_calorie() throws Exception {
       double bmr = calc_bmr();
       double total_cal_intake = calc_calorie_intake(bmr);
       return total_cal_intake;

    }

    public double calc_bmr() throws Exception {
        double res = 0.0;

        if (gender.equals("male")){

            res = 66.47 + 13.75*weight + 5.00*height - 6.78*age;

        }
        else if(gender.equals("female")){
            res = 65.1 + 9.56*weight + 1.85*height - 4.68*age;

        }
        else{
            throw new Exception("Gender must be male or female");
        }
        return res;
    }

    public double calc_calorie_intake(double bmr){
        double activity_multiplier = get_activity_multiplier(activity_level);
        double intake_multiplier = get_calorie_intake_multiplier(calorie_control);
        double daily_calorie_consumption = bmr * activity_multiplier;
        double daily_calorie_intake = daily_calorie_consumption * intake_multiplier;
        return daily_calorie_intake;
    }

    public int get_activity_multiplier(String activity_level) {
        if (activity_level.equals("Sedentary (little or no exercise)")) {
            return 1;
        } else if (activity_level.equals("Lightly active (training/sports 2-3 days/week)")) {
            return 2;
        } else if (activity_level.equals("Moderately active (training/sports 4-5 days/week)")) {
            return 3;
        } else if (activity_level.equals("Very active (training/sports 6-7 days a week)")) {
            return 4;
        } else {
            return 5;
        }
    }

        public double get_calorie_intake_multiplier(String calorie_control) {
            if (calorie_control.equals("Reduce Fat by 30%")) {
                return 0.70;
            } else if (calorie_control.equals("Reduce Fat by 20%")) {
                return 0.75;
            } else if (calorie_control.equals("Reduce Fat by 10%")) {
                return 0.80;
            } else {
                return 1.20;
            }
        }

        public double calc_proteins(){
        return weight * 2.5;
    }

    public double calc_fats(){
        return weight * 1.0;
    }

    public double calc_carbs() throws Exception {
       double bmr = calc_bmr();
       double tdee = calc_calorie_intake(bmr);
       double carb_cal = tdee - calc_proteins()*4.0 - calc_fats()*9.0;
       double carbs = carb_cal/4.0;
       return carbs;

    }





}
