import React from "react";
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
export default MealGenerator

