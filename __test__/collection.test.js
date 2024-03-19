'use strict';

const {
  dbInstance,
  movieCollection,
  restaurantCollection,
} = require('../src/models/');

beforeAll(async () => {
  await dbInstance.sync();
});
afterAll(async () => {
  await dbInstance.drop();
});

describe('Movies and Restaurant Collections', () => {
  let testMovie = {
    title: 'test movie',
    movieType: 'Horror',
    rating: 10
  };
  let testRestaurant = {
    title: 'test restaurant',
    restaurantType: 'Japanese',
    restaurantItem: 'sushi',
    rating: 8
  };

  let movie = null;
  let restaurant = null;
  let restaurants = null;
  let movies = null;

  it('it should be able to create a movie and a restaurant', async () => {
    movie = await movieCollection.create(testMovie);

    testRestaurant['movieId'] = movie.id;
    restaurant = await restaurantCollection.create(testRestaurant);

    expect(movie.title).toEqual(testMovie.title);
    expect(restaurant.title).toEqual(testRestaurant.title);
    expect(restaurant.restaurantItem).toEqual(testRestaurant.restaurantItem);
    expect(restaurant.movieId).toEqual(movie.id);
  });

  it('should be able to fetch movies', async () => {
    let retrievedMovie = await movieCollection.read(1);

    expect(retrievedMovie.title).toBe('test movie');
  });

  it('it should be able to update a movie', async () => {
    movie = await movieCollection.update(movie.id, {
      title: 'test update 2'
    });
    expect(movie).toBeTruthy();
    expect(movie.title).toEqual('test update 2')
  })

  it('it shold be able to delete a restaurant', async () => {
    let restaurantId = await restaurantCollection.delete(restaurant.id);
    expect(restaurantId).toEqual(restaurant.id);

    restaurants = await restaurantCollection.read();

    expect(restaurant.lenght).not.toBeTruthy();
  })

  it('it shold be able to delete a movie', async () => {
    let movieId = await movieCollection.delete(movie.id);
    expect(movieId).toEqual(movie.id);

    movies = await movieCollection.read();

    expect(movie.length).not.toBeTruthy();
  })
});
