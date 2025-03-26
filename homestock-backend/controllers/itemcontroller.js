import Item from '../models/item.js';
import useItem from '../models/useItem.js'

export const getItems = (req, res, next) => {
  Item.find()
    .then(response => {
      res.json({ response });
    })
    .catch(error => {
      res.json({ error: error });
    });
};

export const getUseItems = (req, res, next) => {
  useItem.find()
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

export const addUseItem = (req, res, next) => {
  const useitem = new useItem({
    useId: req.body.useId,
    useName: req.body.useName,
    useType: req.body.useType,
    useWeight: req.body.useWeight,
   
  });
  useitem.save()
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


export const updateUseItem = (req, res, next) => {
  const { useId, useName, useType,  useWeight  } = req.body;
  useItem.updateOne({ useId: useId },
    { $set: { useName: useName, useType:useType ,  useWeight: useWeight } })
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

export const deleteUseItem = (req, res, next) => {
  const useId = req.body.useId;
  useItem.deleteOne({ useId: useId })
    .then(response => {
      res.json({ response });
    })
    .catch(error => {
      res.json({ error: error });
    });
};














export const getNames = (req, res, next) => {
  Item.find({}, 'name')
      .then(items => {
          const itemNames = items.map(item => item.name);
          res.json({ itemNames });
      })
      .catch(error => {
          res.status(500).json({ error: error.message });
      });
};