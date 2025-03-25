import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Button, TextField } from '@mui/material';

const RecipeGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [recipe, setRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [items, setItems] = useState([]);
  const [useItems, setUseItems] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  // Fetch inventory data
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

  // Calculate inventory summary
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
    })).filter(item => item.remaining > 0); // Only show items with remaining quantity
  };

  const toggleIngredient = (ingredientName) => {
    setSelectedIngredients(prev => 
      prev.includes(ingredientName)
        ? prev.filter(name => name !== ingredientName)
        : [...prev, ingredientName]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (selectedIngredients.length === 0 && !prompt.trim()) {
      setError('Please select ingredients or enter a prompt');
      return;
    }

    setIsLoading(true);
    setError('');
    setRecipe('');
    
    try {
      const ingredientsList = selectedIngredients.join(', ');
      const fullPrompt = selectedIngredients.length > 0
        ? `Create a detailed recipe using mainly these ingredients: ${ingredientsList}. ${prompt}`
        : prompt;

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

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Smart Recipe Generator</h1>
      <p style={{ textAlign: 'center', marginBottom: '30px' }}>Get personalized recipes based on your available ingredients</p>
      
      <div style={{ marginBottom: '30px' }}>
        <h3>Available Ingredients</h3>
        <TableContainer component={Paper} style={{ maxHeight: '300px', overflow: 'auto', marginBottom: '20px' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                <TableCell>Ingredient</TableCell>
                <TableCell>Available (kg)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventorySummary.map((item, index) => (
                <TableRow key={index}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedIngredients.includes(item.name)}
                      onChange={() => toggleIngredient(item.name)}
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.remaining.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
        <div style={{ marginBottom: '20px' }}>
          <TextField
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            label="Additional preferences (optional)"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="E.g., 'vegetarian', 'under 30 minutes', 'Italian style', etc."
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          style={{ padding: '10px 20px' }}
        >
          {isLoading ? 'Generating Recipe...' : 'Generate Recipe'}
        </Button>
      </form>
      
      {error && (
        <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>
      )}
      
      {recipe && (
        <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '5px' }}>
          <h2 style={{ marginBottom: '15px' }}>Your Custom Recipe</h2>
          <div style={{ whiteSpace: 'pre-line' }}>{recipe}</div>
        </div>
      )}
    </div>
  );
};

export default RecipeGenerator;