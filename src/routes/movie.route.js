'use strict';

const express = require('express');

const {movieCollection, restaurantCollection} = require('../models/index.js');

const router = express.Router();

router.get('/movies', getMovies);
router.get('/movies/:id', getOneMovies);
router.post('/movies', createMovies);
router.put('/movies/:id', updateMovies);
router.delete('/movies/:id', deleteMovies);

async function getMovies(req, res){
    // null first argument which indicates no specific conditions are applied to the retrieval.
    // read movieCollection, await the call, and no specific model but includes the restaurantCollection
    let allMovies = await movieCollection.read(null, {
        include: { model: restaurantCollection.model},
    });

    res.status(200).json(allMovies);
}

async function getOneMovies(req, res) {
    const id = parseInt(req.params.id);
    let retrievedMovies = await movieCollection.read(id, {
        include: { model: restaurantCollection.model },
      });

    const restaurants = await retrievedMovies.getRestaurants();
    console.log(restaurants);
    res.status(200).json(retrievedMovies);
}

async function createMovies(req, res) {
    let newMovies = req.body;
    let savedMovies = await movieCollection.create(newMovies);
    res.status(200).json(savedMovies);

}

async function updateMovies(req, res) {
    const id = parseInt(req.params.id);

    const obj = req.body;
    let updateMovies = await movieCollection.update(id, obj);

    res.status(200).json(updateMovies);
}

async function deleteMovies(req, res) {
    const id = parseInt(req.params.id);

    let deleteMovies = await movieCollection.delete(id);

    res.status(204).json(deleteMovies);
}

module.exports = router;