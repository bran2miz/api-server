'use strict';
// must install sequelize
const {Sequelize, DataTypes} = require('sequelize');
const people = require("./people.model.js")
const restaurants = require('./restaurants.model.js');
const movies = require('./movies.model.js');
const Collection = require('./collection.js');


// connect to our db this way:
// URI:uniform resource identifier
// URL: uniform resource locator
const POSTGRES_URI= process.env.NODE_ENV === 'test' ? 'sqlite:memory:' :process.env.DATABASE_URI;

//What is sqlite:memory?
// sqlite implements SQL database engine
// force it to store into memory by passing the string ':memory'. 

//there is a temporary in memory db created when you use sqlite:memory: (erases when disconnecting frm db)

let sequelize = new Sequelize(POSTGRES_URI);

const restaurantModel = restaurants(sequelize, DataTypes);
const movieModel = movies(sequelize, DataTypes)

//associates two models or joining two tables
movieModel.hasMany(restaurantModel, {
    foreignKey: 'movieId',
    sourceKey: 'id',
});

restaurantModel.belongsTo(movieModel, {
    foreignKey: 'movieId',
    tragetKey: 'id',
})

const movieCollection = new Collection(movieModel);
const restaurantCollection = new Collection(restaurantModel)

module.exports={
    dbInstance: sequelize, 
    People: people(sequelize, DataTypes),
    Movies: movies(sequelize, DataTypes),
    Restaurants: restaurants(sequelize, DataTypes),
    movieCollection,
    restaurantCollection,
}

// you might have to have a different data model since we have to create an association between two of our models (one to one/one to many/etc.)