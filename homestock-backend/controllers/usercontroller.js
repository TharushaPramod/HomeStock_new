import User from "../models/user_model.js";


export const getUsers = (req, res, next) => {
    User.find()
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.json({ error: error });
        });
};

export const addUser = (req, res, next) => {
    const user = new User({
        id: req.body.id,
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        type: req.body.type,
    });
    user.save()
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.json({ error: error });
        });
};

export const updateUser = (req, res, next) => {
    const { id, username, phone, password } = req.body;
    User.updateOne({ id: id },
        { $set: { username: username, phone: phone, password: password } })
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.json({ error: error });
        });
};

export const deleteUser = (req, res, next) => {
    const id = req.body.id;
    User.deleteOne({ id: id })
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.json({ error: error });
        });
};