'use strict';

const express = require('express');

const { restaurantCollection} = require('../models/index.js');

const router = express.Router();

router.get('/restaurants', getRestaurants);
router.get('/restaurants/:id', getOneRestaurants);
router.post('/restaurants', createRestaurants);
router.put('/restaurants/:id', updateRestaurants);
router.delete('/restaurants/:id', deleteRestaurants);


async function getRestaurants(req, res) {
    let allRestaurants = await restaurantCollection.read();
    res.status(200).json(allRestaurants);
}

async function getOneRestaurants(req, res){
    const id = parseInt(req.params.id);

    let retreivedRestaurants = await restaurantCollection.read(id);

    res.status(200).json(retreivedRestaurants);
}

async function createRestaurants(req, res) {
    let newRestaurants = req.body;
    let savedRestaurants = await restaurantCollection.create(newRestaurants);

    res.status(200).json(savedRestaurants);
}

async function updateRestaurants(req, res) {
    const id = parseInt(req.params.id);

    const updateRestaurantsObj = req.body;

    let updatedRestaurants = await restaurantCollection.update(id, updateRestaurantsObj);

    res.status(200).json(updatedRestaurants)
}

async function deleteRestaurants(req, res) {
    const id = parseInt(req.params.id);

    let deleteRestaurants = await restaurantCollection.delete(id);

    res.status(204).json(deleteRestaurants);
}

module.exports = router;