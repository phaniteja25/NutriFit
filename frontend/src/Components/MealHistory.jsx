import React from 'react';
import { FaTrash } from 'react-icons/fa';

const MealHistory = ({ meal = {}, onDelete }) => {
  const formatMealName = (name = '') => {
    return name ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() : 'Unnamed Meal';
  };

  const handleDelete = () => {
    if (onDelete && meal.mealID) {
      onDelete(meal.mealID);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow duration-300 mb-6 mx-4 md:mx-0 relative">
      <h3 className="text-xl font-bold text-gray-800 pb-4 border-b border-gray-100">
        {formatMealName(meal.mealName)}
      </h3>

      <button
        onClick={handleDelete}
        className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors"
        title="Delete Meal"
      >
        <FaTrash size={20} />
      </button>

      <div className="mt-4">
        <table className="w-full text-left text-gray-700">
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="py-3 pr-8 font-medium text-gray-600">Calories</td>
              <td className="py-3 text-gray-800">{meal.calories || 0} kcal</td>
            </tr>
            <tr>
              <td className="py-3 pr-8 font-medium text-gray-600">Proteins</td>
              <td className="py-3 text-gray-800">{meal.proteins || 0} g</td>
            </tr>
            <tr>
              <td className="py-3 pr-8 font-medium text-gray-600">Fats</td>
              <td className="py-3 text-gray-800">{meal.fats || 0} g</td>
            </tr>
            <tr>
              <td className="py-3 pr-8 font-medium text-gray-600">Carbohydrates</td>
              <td className="py-3 text-gray-800">{meal.carbs || 0} g</td>
            </tr>
            <tr>
              <td className="py-3 pr-8 font-medium text-gray-600">Fibre</td>
              <td className="py-3 text-gray-800">{meal.fibre || 0} g</td>
            </tr>
            <tr>
              <td className="py-3 pr-8 font-medium text-gray-600">Serving Size</td>
              <td className="py-3 text-gray-800">{meal.serving_size || 0} g</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="absolute bottom-4 right-4 text-gray-300 text-sm italic mt-2">
        logged at {meal.log_time ? new Date(meal.log_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : 'N/A'}
      </div>
    </div>
  );
};

export default MealHistory;
