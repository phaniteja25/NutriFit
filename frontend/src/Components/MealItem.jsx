import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

const MealItem = ({ meal, onDelete, onEdit }) => {
  const formatMealName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const handleDelete = () => {
    onDelete(meal.mealID);
  };

  const handleEdit = () => {
    onEdit(meal);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow duration-300 mb-6 mx-4 md:mx-0 relative">
      <h3 className="text-xl font-bold text-gray-800 pb-4 border-b border-gray-100">
        {formatMealName(meal.mealName)}
      </h3>

      <div className="absolute top-4 right-4 flex space-x-3">
        <button
          onClick={handleEdit}
          className="text-blue-500 hover:text-blue-700 transition-colors"
          title="Edit Meal"
        >
          <FaEdit size={20} />
        </button>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 transition-colors"
          title="Delete Meal"
        >
          <FaTrash size={20} />
        </button>
      </div>

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
      <div className="absolute bottom-4 right-4 text-gray-300 text-sm italic mt-2">
        logged at {new Date(meal.log_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </div>
    </div>
  );
};

export default MealItem;