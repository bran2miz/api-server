'use strict';

const { STRING } = require('sequelize');


const Restaurants = (dbInstance, DataTypes) =>
    dbInstance.define('Restaurants', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          restaurantType: {
            type: DataTypes.STRING,
      
          },    
           restaurantItem: {
            type: DataTypes.STRING,
      
          },
          rating: {
            type: DataTypes.INTEGER,
          },
          movieId: {
            type: DataTypes.INTEGER,
            references: {
              model: 'Movies',
              key: 'id',
            },
          },
    })

module.exports = Restaurants;