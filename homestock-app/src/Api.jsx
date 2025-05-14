import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';

const RecipeGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [items, setItems] = useState([]);
  const [useItems, setUseItems] = useState([]);
  const [numPeople, setNumPeople] = useState('');
  const [mealType, setMealType] = useState('');
  const [isInvalidInput, setIsInvalidInput] = useState(false);

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

    if (!/^\d+$/.test(numPeople)) {
      setError('Number of people must be a valid number');
      setIsInvalidInput(true);
      return;
    }

    setIsLoading(true);
    setError('');
    setIsInvalidInput(false);
    setRecipes([]);
    
    try {
      const inventorySummary = getInventorySummary();
      const ingredientsList = inventorySummary.map(item => item.name).join(', ');
      
      if (!ingredientsList) {
        setError('No ingredients available');
        setIsLoading(false);
        return;
      }

      const prompts = [
        `Create a detailed ${mealType} recipe for ${numPeople} people using only these ingredients: ${ingredientsList}. ${prompt} Style: Classic and simple.`,
        `Create a detailed ${mealType} recipe for ${numPeople} people using only these ingredients: ${ingredientsList}. ${prompt} Style: Modern and creative.`
      ];

      const recipePromises = prompts.map(prompt =>
        axios.post('http://localhost:3001/api/generate-recipe', { prompt })
      );

      const responses = await Promise.all(recipePromises);
      const newRecipes = responses.map((res, index) => ({
        title: `Recipe ${index + 1}: ${mealType.charAt(0).toUpperCase() + mealType.slice(1)} (${prompts[index].includes('Classic') ? 'Classic' : 'Modern'})`,
        content: res.data.recipe
      }));

      setRecipes(newRecipes);
    } catch (err) {
      setError('Failed to generate recipes. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNumberInput = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
      setIsInvalidInput(true);
      setError('Number of people must be a valid number');
    } else {
      setIsInvalidInput(false);
      setError('');
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Your Custom Recipes', 20, 20);
    doc.setFontSize(12);
    
    let yOffset = 30;
    recipes.forEach((recipe, index) => {
      doc.setFontSize(14);
      doc.text(recipe.title, 20, yOffset);
      yOffset += 10;
      
      doc.setFontSize(12);
      const splitRecipe = doc.splitTextToSize(recipe.content, 170);
      doc.text(splitRecipe, 20, yOffset);
      yOffset += splitRecipe.length * 7 + 15;

      if (yOffset > 260 && index < recipes.length - 1) {
        doc.addPage();
        yOffset = 20;
      }
    });
    
    doc.save('recipes.pdf');
  };

  const inventorySummary = getInventorySummary();
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

  return (
    <div className="max-w-4xl p-8 mx-auto mt-[100px] mb-[100px] shadow-2xl bg-gradient-to-br from-indigo-100 via-white to-blue-100 rounded-3xl animate-fadeIn">
      <h1 className="mb-5 text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 animate-pulse">Smart Recipe Generator</h1>
      <p className="mb-10 text-lg font-medium text-center text-gray-600 animate-slideUp">Transform your ingredients into culinary masterpieces!</p>
      
      <div className="mb-10 transition-all transform hover:scale-105">
        <h3 className="mb-4 text-3xl font-bold text-indigo-700 animate-slideUp">Available Ingredients</h3>
        <div className="overflow-hidden bg-white border border-indigo-200 shadow-xl rounded-2xl">
          <div className="overflow-y-auto max-h-80">
            <table className="w-full text-left">
              <thead className="sticky top-0 bg-gradient-to-r from-indigo-100 to-blue-100">
                <tr>
                  <th className="px-6 py-4 font-semibold text-indigo-800">Ingredient</th>
                  <th className="px-6 py-4 font-semibold text-indigo-800">Available</th>
                </tr>
              </thead>
              <tbody>
                {inventorySummary.map((item, index) => (
                  <tr key={index} className="transition-colors duration-200 border-t hover:bg-indigo-50">
                    <td className="px-6 py-4 font-medium text-gray-800">{item.name}</td>
                    <td className="px-6 py-4 text-gray-600">{item.remaining.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-11">
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
          <div className="animate-slideUp">
            <label className="block mb-2 text-sm font-semibold text-gray-700">Number of People</label>
            <div className="relative">
              <input
                type="number"
                value={numPeople}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setNumPeople(value);
                    setIsInvalidInput(false);
                    setError('');
                  } else {
                    setIsInvalidInput(true);
                    setError('Number of people must be a valid number');
                  }
                }}
                onKeyPress={handleNumberInput}
                min="1"
                required
                className={`w-full p-4 border rounded-xl focus:ring-4 focus:ring-indigo-300 transition-all duration-300 bg-white shadow-sm hover:shadow-md ${
                  isInvalidInput ? 'border-red-500' : 'border-gray-200 focus:border-indigo-500'
                }`}
              />
              {isInvalidInput && (
                <span className="absolute left-0 mt-1 text-xs text-red-700">Number of people must be a valid number</span>
              )}
            </div>
          </div>
          <div className="animate-slideUp">
            <label className="block mb-2 text-sm font-semibold text-gray-700">Meal Type</label>
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              required
              className="w-full p-4 transition-all duration-300 bg-white border border-gray-200 shadow-sm rounded-xl focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 hover:shadow-md"
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
        <div className="mb-8 animate-slideUp">
          <label className="block mb-2 text-sm font-semibold text-gray-700">Additional Preferences (optional)</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            placeholder="E.g., 'vegetarian', 'under 30 minutes', 'Italian style', etc."
            className="w-full p-4 transition-all duration-300 bg-white border border-gray-200 shadow-sm rounded-xl focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 hover:shadow-md"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="relative w-full px-10 py-4 text-white transition-all duration-300 transform shadow-lg md:w-auto bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl hover:from-indigo-700 hover:to-blue-600 disabled:from-indigo-400 disabled:to-blue-400 disabled:cursor-not-allowed hover:shadow-xl hover:-translate-y-1"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="w-6 h-6 mr-3 text-white animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Generating Recipes...
            </div>
          ) : (
            'Generate Recipes'
          )}
        </button>
      </form>
      
      {error && (
        <div className="p-4 mb-8 text-red-700 bg-red-100 shadow-md rounded-xl animate-slideUp">
          {error}
        </div>
      )}
      
      {recipes.length > 0 && (
        <div className="p-8 bg-white border border-indigo-100 shadow-xl rounded-2xl animate-fadeIn">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-indigo-800">Your Custom Recipes</h2>
            <button
              onClick={downloadPDF}
              className="px-6 py-3 text-white transition-all duration-300 transform shadow-md bg-gradient-to-r from-green-500 to-green-600 rounded-xl hover:from-green-600 hover:to-green-700 hover:shadow-lg hover:-translate-y-1"
            >
              Download PDF
            </button>
          </div>
          {recipes.map((recipe, index) => (
            <div key={index} className="mb-6">
              <h3 className="mb-3 text-2xl font-semibold text-indigo-700">{recipe.title}</h3>
              <div className="leading-relaxed text-gray-700 whitespace-pre-line">{recipe.content}</div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.8s ease-out;
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        span {
          position: absolute;
          top: 100%;
          left: 0;
          margin-top: 4px;
        }
      `}</style>
    </div>
  );
};

export default RecipeGenerator;