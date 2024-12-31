import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MealHistory from './MealHistory';
import Navbar from './Navbar';
import bg_img from './image_bg.jpg';

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
      const response = await fetch('https://nutrifit-production-d71d.up.railway.app/api/meals/get_all_meals', {
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
      const response = await fetch(`https://nutrifit-production-d71d.up.railway.app/api/meals/delete_meal/${mealID}`, {
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
        <h1 className="text-3xl font-bold text-center text-white mb-8">Your History Meals</h1>

        {Object.keys(mealsByDate).length === 0 ? (
          <div className="bg-white rounded-xl bg-opacity-50 shadow-xl p-8 mb-6 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800">No meals added yet!</h2>
            <p className="text-gray-400">Start logging your meals by adding them above.</p>
          </div>
        ) : (
          Object.keys(mealsByDate).reverse().map((date) => (
            <div key={date} className="bg-white bg-opacity-50 rounded-xl shadow-xl p-8 mb-6 border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">{date}</h2>
              <div className="space-y-6">
                {mealsByDate[date]
                  .slice()
                  .reverse()
                  .map((meal) => (
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
