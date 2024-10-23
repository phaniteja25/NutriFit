import React, { useState, useEffect } from 'react';
import MealItem from './MealItem';

const MealLoging = () => {
  const [mealsByDate, setMealsByDate] = useState({});
  const [mealInput, setMealInput] = useState('');

  // Function to format date from YYYY-MM-DD to 'Month Day, Year'
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${monthNames[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
  };

  // Fetch meal data from the API
  const fetchMeals = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await fetch('http://localhost:8080/api/meals/get_all_meals', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch meals');
      }

      const data = await response.json();

      // Group meals by date
      const groupedMeals = data.reduce((acc, curr) => {
        const date = curr.date; // YYYY-MM-DD format
        const formattedDate = formatDate(date); // Convert to 'Month Day, Year' format
        if (!acc[formattedDate]) {
          acc[formattedDate] = [];
        }
        acc[formattedDate].push(...curr.meals);
        return acc;
      }, {});

      setMealsByDate(groupedMeals);
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

      if (!response.ok) {
        throw new Error('Failed to delete meal');
      }

      // Update the state after deletion
      setMealsByDate((prevMeals) => {
        const updatedMeals = { ...prevMeals };
        for (const date in updatedMeals) {
          updatedMeals[date] = updatedMeals[date].filter(meal => meal.mealID !== mealID);
          // Remove the date entry if no meals are left
          if (updatedMeals[date].length === 0) {
            delete updatedMeals[date];
          }
        }
        return updatedMeals;
      });
    } catch (error) {
      console.error('Error deleting meal:', error);
    }
  };

  const handleSaveMeal = async () => {
    if (!mealInput.trim()) {
      alert('Please enter a meal item.');
      return;
    }

    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/meals/log?prompt=${encodeURIComponent(mealInput)}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to save meal');
      }

      // Clear the input field after successful save
      setMealInput('');

      // Reload the meals list after adding a new meal
      fetchMeals();
    } catch (error) {
      console.error('Error saving meal:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 py-8">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        {/* Add Meal Section */}
        <div className="bg-white rounded-xl shadow-xl p-8 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Meal</h2>
          <div className="mb-4">
            <textarea
              value={mealInput}
              onChange={(e) => setMealInput(e.target.value)}
              placeholder="ADD FOOD ITEM...."
              className="flex-grow p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none h-24 transition-all duration-200"
            />
          </div>
          <button
            onClick={handleSaveMeal}
            className="mt-6 px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transition-colors duration-200 font-semibold"
          >
            Save
          </button>
        </div>

        {/* Existing Meals Section */}
        {Object.keys(mealsByDate).length === 0 ? (
          <div className="bg-white rounded-xl shadow-xl p-8 mb-6 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800">No meals added yet!</h2>
            <p className="text-gray-400">Start logging your meals by adding them above.</p>
          </div>
        ) : (
          Object.keys(mealsByDate).map(date => (
            <div key={date} className="bg-white rounded-xl shadow-xl p-8 mb-6 border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">{date}</h2>
              <div className="space-y-6">
                {mealsByDate[date].map(meal => (
                  <MealItem key={meal.mealID} meal={meal} onDelete={handleDeleteMeal} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MealLoging;
