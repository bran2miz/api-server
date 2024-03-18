'use strict';

require('dotenv').config();
const {start} = require('./src/server.js');


//you can just reference the models folder name and not include index.js; it assumes that you meant ./models/index.js
const {dbInstance} = require("./src/models")
const PORT = process.env.PORT || 3000;

//add some code to connect to the database
//sync to the object dbConnection (object from index.js in models)

// syncing: get knowledge of any models currently in our code and not in our db and vice versa

// make a promise using .then() to start server
dbInstance.sync().then(()=> {
  start(PORT);
})


// start function that takes in PORT
