import React, { useState } from 'react';
import Navbar from './Navbar';

function MealLoging(){
        const [mealInputs, setMealInputs] = useState([1]);

    const addMealInput = () => {
        setMealInputs([...mealInputs, mealInputs.length + 1]);
    };

    const removeMealInput = (index) => {
        setMealInputs(mealInputs.filter((_, i) => i !== index));
    };
    return(
        <>
        <Navbar />
        <div className="meal-log-container">
        <h2>Meal Log</h2>
        {mealInputs.map((input, index) => (
            <div className="meal-input" key={index}>
            <textarea placeholder="ADD FOOD ITEM...."></textarea>
            <div className="button-group">
                <button className="add-btn" onClick={addMealInput}>+</button>
                {mealInputs.length > 1 && (
                <button className="remove-btn" onClick={() => removeMealInput(index)}>-</button>
                )}
            </div>
            </div>
        ))}
        <button className="save-btn">Save</button>
        </div>
        </>
    );
};
export default MealLoging