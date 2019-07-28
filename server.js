const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

const Item = require('./models/Item');

// @route   GET api/items
// @desc    Get All Items
// @access  Public
app.get('/api/items', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @route   POST api/items
// @desc    Create An Item
// @access  Public
app.post('/api/items', (req, res) => {
  const newItem = new Item({
    id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  });

  newItem.save().then(item => res.json(item));
});

// @route   DELETE api/items/:id
// @desc    Delete A Item
// @access  Public
app.delete('/api/items/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

// @route   DELETE api/items/:id
// @desc    Delete A Item
// @access  Public
app.put('/api/items/:id', (req, res) => {
  const itemToUpdate = {
    id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  };
  Item.updateOne({_id: req.params.id}, itemToUpdate, function(err, raw) {
    if (err) {
      res.send(err);
    }
    res.send(raw);
  });
});

app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];

  res.json(customers);
});

const port = 6000;

app.listen(port, () => `Server running on port ${port}`);