'use strict';

// import the stuff we need
// express router - express
const express = require('express');
const { People } = require('../models/index.js')
// const { People } from our model index CAPITAL P

// the router method is the umbrella for all things having to do with the /people (kinda like a prototype)

const router = express.Router();

//RESTful route declarations

router.get('/people', getPeople) // get all records from people table

router.get('/people/:id', getOnePerson) // get one person record back based on ID

router.post('/people', createPerson); // creates a single person record

router.put('/people/:id', updatePerson) // updates a single person record

router.delete('/people/:id', deletePerson)

// route handlers - all async because database
async function getPeople(req, res) {
  // searches the db and return all peoples

  let allPeople = await People.findAll();
  // return all the people in the table to the user
  // console.log(People)
  res.status(200).json(allPeople)
}

async function getOnePerson(req, res) {
  // need to convert string from the request into an actual value because when you make the get request, the id is a number and not a string.
  const id = parseInt(req.params.id);

  // go into People table findOne record where the id matches the id on line 34 from the url 
  let retrievedPerson = await People.findOne({ where: { id: id } })

  res.status(200).json(retrievedPerson);
}


async function createPerson(req, res) {
  let newPerson = req.body;
  // people have first and last names, we are assuming that anyone that posts to our route knows that people {firstName: "blah", lastName:"blah"}
  let savedPerson = await People.create(newPerson)

  res.status(200).json(savedPerson);
}

async function updatePerson(req, res) {
  // need to convert string from the request into an actual value because when you make the get request, the id is a number and not a string.
  const id = parseInt(req.params.id);

  //get the new object
  const updatedPersonObj = req.body;

  //find current record associated with that person and update the record
  let retrievedPerson = await People.findOne({ where: { id: id } })
  //update record
  let updatedPerson = await retrievedPerson.update(updatedPersonObj);
  // send to client
  res.status(200).json(updatedPerson);


  res.status(200).json(retrievedPerson);
}

async function deletePerson(req, res) {
  // need to convert string from the request into an actual value because when you make the get request, the id is a number and not a string.
  const id = parseInt(req.params.id);

  // go into People table delete record where the id matches the id on line 74 from the url 
  let deletePerson = await People.destroy({ where: { id } })

  res.status(204).json(deletePerson);
}

module.exports = router;