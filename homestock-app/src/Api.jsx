import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecipeGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [recipe, setRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [items, setItems] = useState([]);
  const [useItems, setUseItems] = useState([]);
  const [numPeople, setNumPeople] = useState('');
  const [mealType, setMealType] = useState('');

  useEffect(() => {
    const getItems = () => {
      axios.get('http://localhost:3001/api/items')
        .then(response => {
          setItems(response.data?.response || []);
        })
        .catch(error => {
          console.log("Axios Error: ", error);
        });
    };

    const getUseItems = () => {
      axios.get('http://localhost:3001/api/getUseItems')
        .then(response => {
          setUseItems(response.data?.response || []);
        })
        .catch(error => {
          console.log("Axios Error: ", error);
        });
    };

    getItems();
    getUseItems();
  }, []);

  const getInventorySummary = () => {
    const available = {};
    items.forEach((item) => {
      if (!available[item.name]) available[item.name] = 0;
      available[item.name] += Number(item.weight) || 0;
    });

    const used = {};
    useItems.forEach((item) => {
      if (!used[item.useName]) used[item.useName] = 0;
      used[item.useName] += Number(item.useWeight) || 0;
    });

    const allNames = new Set([...Object.keys(available), ...Object.keys(used)]);
    
    return Array.from(allNames).map(name => ({
      name,
      available: available[name] || 0,
      used: used[name] || 0,
      remaining: (available[name] || 0) - (used[name] || 0)
    })).filter(item => item.remaining > 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!numPeople || !mealType) {
      setError('Please specify number of people and meal type');
      return;
    }

    setIsLoading(true);
    setError('');
    setRecipe('');
    
    try {
      const inventorySummary = getInventorySummary();
      const ingredientsList = inventorySummary.map(item => item.name).join(', ');
      
      if (!ingredientsList) {
        setError('No ingredients available');
        setIsLoading(false);
        return;
      }

      const fullPrompt = `Create a detailed ${mealType} recipe for ${numPeople} people using only these ingredients: ${ingredientsList}. ${prompt}`;

      const response = await axios.post('http://localhost:3001/api/generate-recipe', {
        prompt: fullPrompt
      });
      setRecipe(response.data.recipe);
    } catch (err) {
      setError('Failed to generate recipe. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const inventorySummary = getInventorySummary();
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

  return (
    <div className="max-w-4xl p-5 mx-auto bg-white bg-opacity-25 rounded-lg mt-[50px]">
      <h1 className="mb-5 text-3xl font-bold text-center">Smart Recipe Generator</h1>
      <p className="mb-8 text-center text-gray-700">Get personalized recipes based on your available ingredients</p>
      
      <div className="mb-8">
        <h3 className="mb-2 text-xl font-semibold font-Poppins">Available Ingredients</h3>
        <div className="overflow-hidden bg-white rounded-lg shadow-md">
          <div className="overflow-y-auto max-h-72">
            <table className="w-full">
              <thead className="sticky top-0 bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-center font-Poppins">Ingredient</th>
                  <th className="px-4 py-2 text-center font-Poppins">Available </th>
                </tr>
              </thead>
              <tbody>
                {inventorySummary.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2 text-center font-Poppins">{item.name}</td>
                    <td className="px-4 py-2 text-center font-Poppins">{item.remaining.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-5 mb-5">
          <div className="flex-1">
            <label className="block mb-1 text-sm font-medium text-gray-900 font-Poppins">Number of People</label>
            <input
              type="number"
              value={numPeople}
              onChange={(e) => setNumPeople(e.target.value)}
              min="1"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 text-sm font-medium text-gray-900 font-Poppins">Meal Type</label>
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select meal type</option>
              {mealTypes.map((type) => (
                <option key={type} value={type.toLowerCase()}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-5">
          <label className="block mb-1 text-sm font-medium text-gray-900 font-Poppins">Additional preferences (optional)</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            placeholder="E.g., 'vegetarian', 'under 30 minutes', 'Italian style', etc."
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full md:w-auto px-6 py-2 text-white rounded-md ${
            isLoading 
              ? 'bg-green-400 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-700'
          } transition-colors`}
        >
          {isLoading ? 'Generating Recipe...' : 'Generate Recipe'}
        </button>
      </form>
      
      {error && (
        <div className="mb-5 text-red-500">{error}</div>
      )}
      
      {recipe && (
        <div className="p-5 rounded-md bg-gray-50">
          <h2 className="mb-3 text-2xl font-semibold">Your Custom Recipe</h2>
          <div className="whitespace-pre-line">{recipe}</div>
        </div>
      )}
    </div>
  );
};

export default RecipeGenerator;