package com.ase.project.nutri_fit_app.util;

public class NutritionalInfoCalcluator {

    private double height;  // in cm
    private double weight;  // in kg
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

    public double calc_calorie() throws Exception {
        double bmr = calc_bmr();  // Calculate BMR
        double total_cal_intake = calc_calorie_intake(bmr);  // Adjust for activity level and goal
        return total_cal_intake;
    }

    private double calc_bmr() throws Exception {
        if (gender.equalsIgnoreCase("male")) {
            return 10 * weight + 6.25 * height - 5 * age + 5;
        } else if (gender.equalsIgnoreCase("female")) {
            return 10 * weight + 6.25 * height - 5 * age - 161;
        } else {
            throw new Exception("Gender must be male or female");
        }
    }

    private double calc_calorie_intake(double bmr) {
        double activity_multiplier = get_activity_multiplier(activity_level);
        double intake_multiplier = get_calorie_intake_multiplier(calorie_control);
        double tdee = bmr * activity_multiplier;  // Total Daily Energy Expenditure
        return tdee * intake_multiplier;  // Adjusted for calorie control (fat loss)
    }

    private double get_activity_multiplier(String activity_level) {
        switch (activity_level) {
            case "Sedentary (little or no exercise)":
                return 1.2;
            case "Lightly active (training/sports 2-3 days/week)":
                return 1.375;
            case "Moderately active (training/sports 4-5 days/week)":
                return 1.55;
            case "Very active (training/sports 6-7 days a week)":
                return 1.725;
            case "Super active (very intense exercise daily)":
                return 1.9;
            default:
                return 1.2;  // Default to sedentary if not specified
        }
    }

    private double get_calorie_intake_multiplier(String calorie_control) {
        switch (calorie_control) {
            case "Reduce Fat by 30%":
                return 0.70;
            case "Reduce Fat by 20%":
                return 0.80;
            case "Reduce Fat by 10%":
                return 0.90;
            case "Gain Muscle":
                return 1.30;
            default:  // Default to maintenance or a slight surplus
                return 1.00;
        }
    }

    public double calc_proteins() {
        // Protein intake: 1.6 - 2.2 g per kg of body weight (we use 2.0 here)
        return weight * 2.0;  // g/day
    }

    public double calc_fats() {
        // Fat intake: 0.8 - 1.0 g per kg of body weight (we use 0.8 here)
        return weight * 0.8;  // g/day
    }

    public double calc_carbs() throws Exception {
        double tdee = calc_calorie();  // Total calorie intake
        double protein_calories = calc_proteins() * 4;  // 4 calories per gram of protein
        double fat_calories = calc_fats() * 9;  // 9 calories per gram of fat

        double remaining_calories = tdee - protein_calories - fat_calories;
        return remaining_calories / 4.0;  // 4 calories per gram of carbs
    }
}
