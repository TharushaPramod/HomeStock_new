import Item from '../models/item.js';

export const getItems = (req, res, next) => {
  Item.find()
    .then(response => {
      res.json({ response });
    })
    .catch(error => {
      res.json({ error: error });
    });
};

export const addItem = (req, res, next) => {
  const item = new Item({
    id: req.body.id,
    name: req.body.name,
    qty: req.body.qty,
    weight: req.body.weight,
    price: req.body.price,
    expireDate: req.body.expireDate,
  });
  item.save()
    .then(response => {
      res.json({ response });
    })
    .catch(error => {
      res.json({ error: error });
    });
};

export const updateItem = (req, res, next) => {
  const { id, name, qty, weight, price, expireDate } = req.body;
  Item.updateOne({ id: id },
    { $set: { name: name, qty: qty, weight: weight, price: price, expireDate: expireDate } })
    .then(response => {
      res.json({ response });
    })
    .catch(error => {
      res.json({ error: error });
    });
};

export const deleteItem = (req, res, next) => {
  const id = req.body.id;
  Item.deleteOne({ id: id })
    .then(response => {
      res.json({ response });
    })
    .catch(error => {
      res.json({ error: error });
    });
};