const supertest = require('supertest');
const {server} = require('../src/server.js');
const mockRequest = supertest(server);
const { dbInstance } = require('../src/models/index.js')

// describe('server routes and functionality', () => {
//     beforeAll(async() => {
//         // before each test, connect to database
//         await dbInstance.sync();
//     });
//     afterAll(async()=> {
//         //disconnect after you run the test
//         await dbInstance.drop();
//     });
//     it('can create a record', async() => {
//         const person = {
//             firstName: 'Hilde',
//             lastName: 'Cute'
//         };

//         // res.body.firstName ? 'Hilde'
//         // res.body.lastName ? 'Cute'

//         // make a request to my route to people. I expect from the response to be a positive status of 200
//         const response = (await mockRequest.post('/people')).setEncoding(person);
//         expect(response.status).toBe(200);

//         //expect the response.body to have an id
//         expect(response.body.id).toBeDefined();

//         // testing for each key that I sent in that i have an equal key that is coming back
//         Object.keys(person).forEach((key) => {
//             expect(person[key]).toEqual(response.body[key]);
//         })
//     })
// })


describe(' web server', () => {
    beforeAll(async () => {
      await dbInstance.sync();
    });
    afterAll(async () => {
      await dbInstance.drop();
    });
    it('should respond with a 404 on an invalid route', () => {
      return mockRequest.get('/sushi').then((results) => {
        expect(results.status).toBe(404);
      });
    });
    it('should respond with a 404 on an invalid method', async () => {
      const response = await mockRequest.put('/sushi');
      expect(response.status).toBe(404);
    });
  
    it('can create a restaurant record', async () => {
      const restaurant = {
        title: 'Umi Sushi',
        rating: 8,
      };
  
      const response = await mockRequest.post('/restaurants').send(restaurant);
      expect(response.status).toBe(200);
  
      expect(response.body.id).toBeDefined();
      expect(response.body['title']).toEqual('Umi Sushi');
      Object.keys(restaurant).forEach((key) => {
        expect(restaurant[key]).toEqual(response.body[key]);
      });
    });
  
    it('can get a list of restaurant records', async () => {
      const response = await mockRequest.get('/restaurants');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toEqual(1);
    });
  
    it('can get one restaurant record', async () => {
      const response = await mockRequest.get('/restaurants/1');
      expect(response.status).toBe(200);
      expect(typeof response.body).toEqual('object');
      expect(response.body.id).toEqual(1);
    });
  
    it('can update a restaurant record', async () => {
      const data = { rating: '8' };
      const response = await mockRequest.put('/restaurants/1').send(data);
      expect(response.status).toBe(200);
      expect(typeof response.body).toEqual('object');
      expect(response.body.id).toEqual(1);
      expect(response.body.rating).toEqual('8');
    });
  
    it('can delete a restaurant record', async () => {
      const response = await mockRequest.delete('/restaurants/1');
      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
  
      const getResponse = await mockRequest.get('/restaurants');
      expect(getResponse.body.length).toEqual(0);
    });
  
    it('can create a movie record', async () => {
      const movie = {
        title: 'Inception',
        rating: 9.3,
      };
  
      const response = await mockRequest.post('/movies').send(movie);
      expect(response.status).toBe(200);
  
      expect(response.body.id).toBeDefined();
      expect(response.body['title']).toEqual('Inception');
      Object.keys(movie).forEach((key) => {
        expect(movie[key]).toEqual(response.body[key]);
      });
    });
  
    it('can get a list of movie records', async () => {
      const response = await mockRequest.get('/movies');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toEqual(1);
    });
  
    it('can get a movie record', async () => {
      const response = await mockRequest.get('/movies/1');
      expect(response.status).toBe(200);
      expect(typeof response.body).toEqual('object');
      expect(response.body.id).toEqual(1);
    });
  
    it('can update a movie record', async () => {
      const data = { rating: 8.5 };
      const response = await mockRequest.put('/movies/1').send(data);
      expect(response.status).toBe(200);
      expect(typeof response.body).toEqual('object');
      expect(response.body.id).toEqual(1);
      expect(response.body.rating).toEqual(8.5);
    });
  
    it('can delete a movie record', async () => {
      const response = await mockRequest.delete('/movies/1');
      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
  
      const getResponse = await mockRequest.get('/movies');
      expect(getResponse.body.length).toEqual(0);
    });
  });