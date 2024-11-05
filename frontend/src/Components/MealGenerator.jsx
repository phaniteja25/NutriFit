/* import React from "react";
import Navbar from './Navbar';

function MealGenerator(){
    return(
        <>
        <Navbar />
        <div className="container">
        <div className="form-group">
        <label>Days</label>
        <input type="text" placeholder="Enter days" />
        
        <label>Protein</label>
        <input type="text" placeholder="Enter protein" />
        
        <label>Carbs</label>
        <input type="text" placeholder="Enter carbs" />
        </div>
        <div className="form-group">
        <label>Fats</label>
        <input type="text" placeholder="Enter fats" />
        
        <label>Calories</label>
        <input type="text" placeholder="Enter calories" />
        
        <div className="radio-group">
            <label>Veg</label>
            <input type="radio" name="diet" value="veg" />
            <label>Non-Veg</label>
            <input type="radio" name="diet" value="nonveg" />
        </div>

        <button className="generate-button">Generate</button>
        </div>
        </div>
        </>
    )
}
export default MealGenerator */

import axios from 'axios';
import React, { useState } from "react";
import Navbar from './Navbar';

function MealGenerator() {
    // State variables to store input values
    const [days, setDays] = useState("");
    const [protein, setProtein] = useState("");
    const [carbs, setCarbs] = useState("");
    const [fats, setFats] = useState("");
    const [calories, setCalories] = useState("");
    const [diet, setDiet] = useState("veg");

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create request body object to match your backend's MealPlanRequestDto
        const mealPlanRequestDto = {
            days: parseInt(days),
            protein: parseFloat(protein),
            carbs: parseFloat(carbs),
            fats: parseFloat(fats),
            calories: parseFloat(calories),
            diet: diet
        };

        try {
            // Get JWT token (assuming it's stored in localStorage)
            const token = localStorage.getItem("token");

            // Make POST request to backend with headers and body
            const response = await axios.post(
                "/create",
                mealPlanRequestDto,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log("Meal plan created successfully:", response.data);

        } catch (error) {
            console.error("Error creating meal plan:", error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Days</label>
                        <input type="text" placeholder="Enter days" value={days} onChange={(e) => setDays(e.target.value)} />

                        <label>Protein</label>
                        <input type="text" placeholder="Enter protein" value={protein} onChange={(e) => setProtein(e.target.value)} />

                        <label>Carbs</label>
                        <input type="text" placeholder="Enter carbs" value={carbs} onChange={(e) => setCarbs(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Fats</label>
                        <input type="text" placeholder="Enter fats" value={fats} onChange={(e) => setFats(e.target.value)} />

                        <label>Calories</label>
                        <input type="text" placeholder="Enter calories" value={calories} onChange={(e) => setCalories(e.target.value)} />

                        <div className="radio-group">
                            <label>Veg</label>
                            <input type="radio" name="diet" value="veg" checked={diet === "veg"} onChange={(e) => setDiet(e.target.value)} />
                            <label>Non-Veg</label>
                            <input type="radio" name="diet" value="nonveg" checked={diet === "nonveg"} onChange={(e) => setDiet(e.target.value)} />
                        </div>

                        <button type="submit" className="generate-button">Generate</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default MealGenerator;
