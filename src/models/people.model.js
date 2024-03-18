'use strict';

// const { DataTypes } = require("sequelize");


// creating a people table 
// where am I putting the table (in what db connection)
// what are data types: what datatype the first name will be using DataTypes.actualdatatype
const People = (dbInstance, DataTypes) => {
  //define the table as 'People' and the things in the table
  // second argument is the shape of the model
 return dbInstance.define('People',{
    firstName: {
      // datatype must be in all caps
      type: DataTypes.STRING,
      // if you want the info to be REQUIRED you can allowNull to equate false
      //allowNull defaults to true
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
    }
  }
  )
}

module.exports = People;

// single line functions have an implied return 
// const super = () => "super"
// below is a code block if you have curly bracket and needs a return
// const super = () => { return "super"}