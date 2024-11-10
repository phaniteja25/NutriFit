import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MealHistory from './MealHistory';
import Navbar from './Navbar';

const History = () => {
  const [mealsByDate, setMealsByDate] = useState({});
  const navigate = useNavigate();

  const fetchMeals = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found');
        return;
    }
    try {
        const response = await fetch('http://localhost:8080/api/meals/get_all_meals', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) throw new Error('Failed to fetch meals');
        const data = await response.json();

        console.log('Fetched meal data:', data); // Debugging: Log fetched data

        const mealsByDate = data.reduce((acc, entry) => {
            const date = entry.date; // Access top-level date
            if (!acc[date]) acc[date] = [];
            acc[date].push(...entry.meals); // Push all meals under this date
            return acc;
        }, {});

        console.log('Meals organized by date:', mealsByDate); // Debugging: Log meals by date
        setMealsByDate(mealsByDate);
    } catch (error) {
        console.error('Error fetching meals:', error);
    }
};

useEffect(() => {
    fetchMeals();
}, []);

    const handleDeleteMeal = async (mealID) => {
    const token = localStorage.getItem('token');
    if (!token) {
console.error('No token found');
    return;
    }
    try {
    const response = await fetch(`http://localhost:8080/api/meals/delete_meal/${mealID}`, {
        method: 'DELETE',
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) throw new Error('Failed to delete meal');
    
    fetchMeals();
    } catch (error) {
    console.error('Error deleting meal:', error);
    }
};

return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-100 p-6">
    <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Your History Meals</h1>
    
    {Object.keys(mealsByDate).length === 0 ? (
        <div className="bg-white rounded-xl shadow-xl p-8 mb-6 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800">No meals added yet!</h2>
            <p className="text-gray-400">Start logging your meals by adding them above.</p>
        </div>
    ) : (
        Object.keys(mealsByDate).reverse().map(date => (
            <div key={date} className="bg-white rounded-xl shadow-xl p-8 mb-6 border border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">{date}</h2>
                <div className="space-y-6">
                    {mealsByDate[date].slice().reverse().map(meal => (
                        <MealHistory key={meal.mealID || meal.id} meal={meal} onDelete={handleDeleteMeal} />
                    ))}
                </div>
            </div>
        ))
    )}
</div>
    </>
);
};

export default History;