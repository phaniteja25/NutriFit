import React from 'react';
import { FaTrash } from 'react-icons/fa'; // Importing a trash icon from react-icons

const MealItem = ({ meal, onDelete }) => {
  // Format meal name to capitalize only the first word
  const formatMealName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const handleDelete = () => {
    onDelete(meal.mealID); // Call the delete function with mealID
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
              <td className="py-3 text-gray-800">{meal.calories} kcal</td>
            </tr>
            <tr>
              <td className="py-3 pr-8 font-medium text-gray-600">Proteins</td>
              <td className="py-3 text-gray-800">{meal.proteins} g</td>
            </tr>
            <tr>
              <td className="py-3 pr-8 font-medium text-gray-600">Fats</td>
              <td className="py-3 text-gray-800">{meal.fats} g</td>
            </tr>
            <tr>
              <td className="py-3 pr-8 font-medium text-gray-600">Carbohydrates</td>
              <td className="py-3 text-gray-800">{meal.carbs} g</td>
            </tr>
            <tr>
              <td className="py-3 pr-8 font-medium text-gray-600">Fibre</td>
              <td className="py-3 text-gray-800">{meal.fibre} g</td>
            </tr>
            <tr>
              <td className="py-3 pr-8 font-medium text-gray-600">Serving Size</td>
              <td className="py-3 text-gray-800">{meal.serving_size} g</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Displaying logged time at the bottom right of the card */}
      <div className="absolute bottom-4 right-4 text-gray-300 text-sm italic mt-2">
        logged at {new Date(meal.log_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </div>
    </div>
  );
};

export default MealItem;
