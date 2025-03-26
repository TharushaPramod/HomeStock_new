import GroceryList from "../models/grocerylist.js";
import { response } from "express";

export const getGroceryList = (req, res, next) => {
    GroceryList.find()
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.json({ error: error });
        });
};

export const addItemtoGL = async (req, res) => {
    try {
        const { name, quantity, category, status } = req.body;

        if (!name || !quantity || !category) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const groceryItem = new GroceryList({
            name,
            quantity,
            category,
            status: status || 'Pending', // Set default status if not provided
        });

        const savedItem = await groceryItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        console.error("Error adding item:", error);
        res.status(500).json({ message: "Failed to add item", error: error.message });
    }
};



export const updateGroceryList = async (req, res) => {
    try {
        const { id } = req.params; // Change from _id to id
        const updatedItem = await GroceryList.findByIdAndUpdate(
            id, // Use id directly
            req.body,
            { new: true, runValidators: true } // Add runValidators
        );
        
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        
        res.status(200).json(updatedItem);
    } catch (error) {
        console.error("Update error:", error);
        res.status(400).json({ 
            message: error.message,
            errors: error.errors 
        });
    }
};

export const getItemById = async (req, res) => {
    try {
      const item = await GroceryList.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.status(200).json(item);
    } catch (error) {
      console.error("Error fetching item by ID:", error);
      res.status(500).json({ 
        message: 'Error fetching item',
        error: error.message 
      });
    }
  };

export const deleteGroceryList = async (req, res) => {
    try {
        const { id } = req.params;
        await GroceryList.findByIdAndDelete(id);
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};