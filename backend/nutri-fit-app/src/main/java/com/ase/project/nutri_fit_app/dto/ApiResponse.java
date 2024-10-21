package com.ase.project.nutri_fit_app.dto;

import java.util.List;

public class ApiResponse {
    public ApiResponse() {
    }



    public List<APIMealData> items;

    public ApiResponse(List<APIMealData> items) {
        this.items = items;
    }

    public List<APIMealData> getAllMealData() {
        return items;
    }

    public void setAllMealData(List<APIMealData> items) {
        this.items = items;
    }


}
