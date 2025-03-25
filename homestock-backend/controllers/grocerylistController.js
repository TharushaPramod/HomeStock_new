import { response } from "express";
import GroceryList from "../models/grocerylist.js";

export const getGroceryList = (req, res, next) => {
    GroceryList.find()
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.json({ error: error });
        });
};

export const addItemtoGL = (req, res, next) => {
    const itemtoGL = new GroceryList({
        id: req.body.id,
        name: req.body.name,
        quantity: req.body.quantity,
        category: req.body.category,
        status: req.body.status,
    });
    itemtoGL.save()
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.json({error: error });
        });
};

export const updateGroceryList = (req, res, next) => {
    const{ id, name, quantity, category, status } = req.body;
    GroceryList.updateOne({ id: id },
        { $set: {name: name, quantity: quantity, category: category, status: status }})
            .then(response => {
                res.json({ response });
            })
            .catch(error => {
                res.json({ error: error });
            });
};

export const deleteGroceryList = (req, res, next) => {
    const id = req.body.id;
    GroceryList.deleteOne({ id: id })
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.json({ error: error });
        });
};