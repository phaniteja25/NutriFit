import React, { useEffect, useState } from 'react';
import Navbar from '../sharedUI/Navbar';
import bg_img from '../assets/image_bg.jpg';


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

    const fetchMealPlan = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch("http://localhost:8080/mealPlan/getmeals", {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Error retrieving meal plan');
            }

            const mealData = await response.json();
            setMealPlan(mealData);
            console.log(mealData);
        } catch (error) {
            console.error('Error fetching meal plan:', error);
            setWarningMessage('Failed to fetch meal plan. Please try again.');
        } finally {
            setLoading(false);
        }
    };

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
            const response = await fetch("http://localhost:8080/mealPlan/create", {
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

            if (!response.ok) {
                throw new Error('Error creating meal plan');
            }
            await fetchMealPlan();
        } catch (error) {
            console.error('Error generating meal plan:', error);
            setWarningMessage('Failed to generate meal plan. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const downloadCSV = () => {
        if (!mealPlan || !mealPlan.mealPlan) return;

        const headers = ['Day', 'Meal Name', 'Meal Type', 'Protein (g)', 'Carbs (g)', 'Fat (g)', 'Calories'];
        const rows = [];

        mealPlan.mealPlan.forEach(dayMeal => {
            dayMeal.meals.forEach(meal => {
                rows.push([
                    dayMeal.day,
                    meal.name,
                    meal.type,
                    meal.protein,
                    meal.carbs,
                    meal.fat,
                    meal.calories
                ]);
            });
        });

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'meal_plan.csv';
        link.click();
        URL.revokeObjectURL(url);
    };

    useEffect(() => {
        fetchMealPlan();
    }, []);

    return (
        <>
            <Navbar />
            <div
                className="min-h-screen p-6"
                style={{
                    backgroundImage: `url(${bg_img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundBlendMode: 'darken',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                }}
            >
                <div className="meal-plan-container bg-white p-8 rounded-lg shadow-lg bg-opacity-90">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">AI Meal Plan Generator<br />Powered by Google Gemini</h2>
                    <div className="form-group mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Days:</label>
                        <input
                            type="number"
                            value={noOfDaysPlan}
                            onChange={(e) => setNoOfDaysPlan(e.target.value)}
                            min="2"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Cuisine/Diet Type: Ex: Indian, Chinese, Keto Diet</label>
                        <input
                            type="text"
                            value={cuisineType}
                            onChange={(e) => setCuisineType(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Food Preference: Ex: Veg, NonVeg</label>
                        <input
                            type="text"
                            value={foodPref}
                            onChange={(e) => setFoodPref(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Allergies (comma separated): Ex: Egg, Tofu, Soy</label>
                        <input
                            type="text"
                            value={allergies.join(', ')}
                            onChange={handleAllergiesChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <button
                        onClick={handleGenerateMealPlan}
                        disabled={loading}
                        className={`w-full py-2 text-white font-bold rounded-lg ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
                    >
                        {loading ? "Generating..." : "Generate"}
                    </button>

                    {warningMessage && (
                        <p className="text-red-500 mt-4">{warningMessage}</p>
                    )}
                </div>

                {mealPlan && !loading && (
                    <div className="generated-meal-plan mt-8 bg-white p-8 rounded-lg shadow-lg">
                        <div className="meal-plan-header mb-4">
                            <h3 className="text-xl font-bold text-gray-800">Generated Meal Plan</h3>
                        </div>
                        <div className="meal-plan-days">
                            {mealPlan.mealPlan.map((dayMeal, index) => (
                                <div key={index} className="meal-card mb-4 p-4 bg-gray-100 rounded-lg">
                                    <h4 className="text-lg font-bold mb-2">{dayMeal.day}</h4>
                                    {dayMeal.meals.map((meal, mealIndex) => (
                                        <div key={mealIndex} className="meal-info mb-2">
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
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={downloadCSV}
                                className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
                            >
                                Export to CSV
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default MealPlanGenerator;
