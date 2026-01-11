import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MealItem from './MealItem';
import Navbar from '../sharedUI/Navbar';
import bg_img from '../assets/image_bg.jpg';

const MealLoging = () => {
  const [mealsByDate, setMealsByDate] = useState({});
  const [mealInput, setMealInput] = useState('');
  const [manualLogVisible, setManualLogVisible] = useState(false);
  const [editingMeal, setEditingMeal] = useState(null);
  const [manualMeal, setManualMeal] = useState({
    meal_name: '',
    proteins: '',
    carbs: '',
    fats: '',
    calories: '',
    fibre: '',
    serving_size: ''
  });

  const navigate = useNavigate();

  const fetchMeals = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/api/meals/get_current_day_meals', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch meals');
      const data = await response.json();
      const mealsByDate = data.reduce((acc, meal) => {
        const date = meal.log_date;
        if (!acc[date]) acc[date] = [];
        acc[date].push(meal);
        return acc;
      }, {});
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

  const handleSaveManualMeal = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/api/meals/manual_log', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(manualMeal),
      });
      if (!response.ok) throw new Error('Failed to manually log meal');
      alert('Meal logged successfully');
      setManualLogVisible(false);
      setManualMeal({
        meal_name: '',
        proteins: '',
        carbs: '',
        fats: '',
        calories: '',
        fibre: '',
        serving_size: ''
      });
      fetchMeals();
    } catch (error) {
      console.error('Error logging meal manually:', error);
    }
  };

  const handleEditMeal = (meal) => {
    setEditingMeal(meal);
    setManualMeal({
      meal_name: meal.mealName, // Note: adjusted to match your backend field name
      proteins: meal.proteins,
      carbs: meal.carbs,
      fats: meal.fats,
      calories: meal.calories,
      fibre: meal.fibre,
      serving_size: meal.serving_size
    });
    setManualLogVisible(true);
  };

  const handleUpdateMeal = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/meals/update_meal/${editingMeal.mealID}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(manualMeal),
      });

      if (!response.ok) throw new Error('Failed to update meal');
      
      alert('Meal updated successfully');
      setManualLogVisible(false);
      setEditingMeal(null);
      setManualMeal({
        meal_name: '',
        proteins: '',
        carbs: '',
        fats: '',
        calories: '',
        fibre: '',
        serving_size: ''
      });
      fetchMeals();
    } catch (error) {
      console.error('Error updating meal:', error);
      alert('Failed to update meal');
    }
  };

  const handleManualLogging = () => {
    setManualLogVisible(true);
  };

  const handleManualInputChange = (e) => {
    const { name, value } = e.target;
    setManualMeal((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancelManualMeal = () => {
    setManualLogVisible(false);
    setEditingMeal(null);
    setManualMeal({
      meal_name: '',
      proteins: '',
      carbs: '',
      fats: '',
      calories: '',
      fibre: '',
      serving_size: ''
    });
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
      if (!response.ok) throw new Error('Failed to save meal');

      const data = await response.json();
      if (Array.isArray(data) && data.length === 0) {
        alert("Sorry, we couldn't identify your food item. Please try manual logging.");
      } else {
        fetchMeals();
      }
    } catch (error) {
      console.error('Error saving meal:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen flex flex-col justify-center items-center"
        style={{
          backgroundImage: `url(${bg_img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'darken',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      >
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="bg-white rounded-xl shadow-xl p-8 mb-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Meal</h2>
            <p>Please add your meals in grams(g), kilograms(kg), pounds(lb), ounce(oz)</p>
            <div className="mb-4">
              <textarea
                value={mealInput}
                onChange={(e) => setMealInput(e.target.value)}
                placeholder="ADD FOOD ITEM...."
                className="flex-grow p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none h-24 transition-all duration-200"
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleSaveMeal}
                disabled={!mealInput.trim()}
                className={`px-8 py-3 text-white rounded-lg shadow-md transition-colors duration-200 font-semibold ${
                  mealInput.trim() ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                Save
              </button>
              <button
                onClick={handleManualLogging}
                className="px-8 py-3 text-white rounded-lg shadow-md bg-blue-500 hover:bg-blue-600 transition-colors duration-200 font-semibold"
              >
                Manual Logging
              </button>
            </div>
          </div>

          {manualLogVisible && (
            <div className="bg-white rounded-xl shadow-xl p-8 mb-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {editingMeal ? 'Edit Meal' : 'Manual Meal Logging'}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {['meal_name', 'proteins', 'carbs', 'fats', 'calories', 'fibre', 'serving_size'].map((field) => (
                  <div key={field} className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      {field.replace('_', ' ').toUpperCase()}
                    </label>
                    <input
                      type="text"
                      name={field}
                      value={manualMeal[field]}
                      onChange={handleManualInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                ))}
              </div>
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={editingMeal ? handleUpdateMeal : handleSaveManualMeal}
                  className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transition-colors duration-200 font-semibold"
                >
                  {editingMeal ? 'Update Meal' : 'Save Manual Meal'}
                </button>
                <button
                  onClick={handleCancelManualMeal}
                  className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition-colors duration-200 font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

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
                    <MealItem 
                      key={meal.mealID} 
                      meal={meal} 
                      onDelete={handleDeleteMeal}
                      onEdit={handleEditMeal} 
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default MealLoging;
