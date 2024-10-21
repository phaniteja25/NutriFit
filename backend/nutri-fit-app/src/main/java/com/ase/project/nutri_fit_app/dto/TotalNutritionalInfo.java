package com.ase.project.nutri_fit_app.dto;

public class TotalNutritionalInfo {

    private Double  totalCalories;
    private Double totalProteins;
    private Double totalFats;
    private Double totalFibre;
    private Double totalCarbs;

    public TotalNutritionalInfo(Double totalCalories, Double totalProteins, Double totalCarbs, Double totalFats, Double totalFibre) {
        this.totalCalories = totalCalories;
        this.totalProteins = totalProteins;
        this.totalFats = totalFats;
        this.totalFibre = totalFibre;
        this.totalCarbs = totalCarbs;
    }

    public TotalNutritionalInfo() {
    }

    public Double getTotalCalories() {
        return totalCalories;
    }

    public void setTotalCalories(Double totalCalories) {
        this.totalCalories = totalCalories;
    }

    public Double getTotalProteins() {
        return totalProteins;
    }

    public void setTotalProteins(Double totalProteins) {
        this.totalProteins = totalProteins;
    }

    public Double getTotalFats() {
        return totalFats;
    }

    public void setTotalFats(Double totalFats) {
        this.totalFats = totalFats;
    }

    public Double getTotalFibre() {
        return totalFibre;
    }

    public void setTotalFibre(Double totalFibre) {
        this.totalFibre = totalFibre;
    }

    public Double getTotalCarbs() {
        return totalCarbs;
    }

    public void setTotalCarbs(Double totalCarbs) {
        this.totalCarbs = totalCarbs;
    }
}
