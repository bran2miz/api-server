'use strict';


const Movies = (dbInstance, DataTypes) =>
    dbInstance.define('Movies', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },    
      movieType: {
        type: DataTypes.STRING,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    });

module.exports = Movies;    