import React, { useState } from 'react';
import Navbar from './Navbar';

const MealPlanGenerator = () => {
    const [noOfDaysPlan, setNoOfDaysPlan] = useState(2);
    const [cuisineType, setCuisineType] = useState('');
    const [foodPref, setFoodPref] = useState('');
    const [allergies, setAllergies] = useState([]);
    const [mealPlan, setMealPlan] = useState(null);
    const [loading, setLoading] = useState(false);
    const [warningMessage, setWarningMessage] = useState('');

    const handleAllergiesChange = (e) => {
        setAllergies(e.target.value.split(',').map(allergy => allergy.trim()));
    };

    const isFormValid = noOfDaysPlan >= 2 && cuisineType.trim() && foodPref.trim();

    const handleGenerateMealPlan = async () => {
        if (!isFormValid) {
            setWarningMessage(noOfDaysPlan < 2 ? 
                "Please enter a minimum of 2 days." : 
                "Please fill in all required fields before generating the meal plan.");
            return;
        }
        
        setWarningMessage('');
        setLoading(true);

        try {
            const token = localStorage.getItem('token');

            const createResponse = await fetch("http://localhost:8080/mealPlan/create", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    noOfDaysPlan,
                    cuisineType,
                    foodPref,
                    allergies,
                })
            });

            if (!createResponse.ok) {
                throw new Error('Error creating meal plan');
            }

            const mealsResponse = await fetch("http://localhost:8080/mealPlan/getmeals", {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!mealsResponse.ok) {
                throw new Error('Error retrieving meal plan');
            }

            const mealData = await mealsResponse.json();
            setMealPlan(mealData);
        } catch (error) {
            console.error('Error generating meal plan:', error);
            setWarningMessage('Failed to generate meal plan. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="meal-plan-container">
                <h2>Generate Meal Plan</h2>
                <div className="form-group">
                    <label>Days:</label>
                    <input
                        type="number"
                        value={noOfDaysPlan}
                        onChange={(e) => setNoOfDaysPlan(e.target.value)}
                        min="2"
                    />
                </div>
                <div className="form-group">
                    <label>Cuisine: Ex: Indian, Chinese, Mexican </label>
                    <input
                        type="text"
                        value={cuisineType}
                        onChange={(e) => setCuisineType(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Food Preference: Ex: Veg, NonVeg </label>
                    <input
                        type="text"
                        value={foodPref}
                        onChange={(e) => setFoodPref(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Allergies (comma separated) Ex: Egg,Tofu Soy:</label>
                    <input
                        type="text"
                        value={allergies.join(', ')}
                        onChange={handleAllergiesChange}
                    />
                </div>
                <button onClick={handleGenerateMealPlan} disabled={loading}>
                    {loading ? "Generating..." : "Generate"}
                </button>

                {warningMessage && (
                    <p style={{ color: 'red', marginTop: '10px' }}>{warningMessage}</p>
                )}
            </div>

            {mealPlan && !loading && (
                <div className="generated-meal-plan">
                    <div className="meal-plan-header">
                        <h3>Generated Meal Plan</h3>
                    </div>
                    <div className="meal-plan-days">
                        {mealPlan.mealPlan.map((dayMeal, index) => (
                            <div key={index} className="meal-card">
                                <h4>{dayMeal.day}</h4>
                                {dayMeal.meals.map((meal, mealIndex) => (
                                    <div key={mealIndex} className="meal-info">
                                        <p><strong>Name:</strong> {meal.name}</p>
                                        <p>Type: {meal.type}</p>
                                        <p>Protein: {meal.protein}g</p>
                                        <p>Carbs: {meal.carbs}g</p>
                                        <p>Fat: {meal.fat}g</p>
                                        <p>Calories: {meal.calories}</p>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default MealPlanGenerator;
