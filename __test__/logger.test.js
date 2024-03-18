'use strict';

const logger = require('../src/middleware/logger.js');

describe("test the logger middleware", () => {
  let consoleSpy;
  let req = {path: '/test'};
  let res = {};
  let next = jest.fn();


    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('properly logs some output', () => {
      logger(req,res,next);
      expect(consoleSpy).toHaveBeenCalledWith(`Hello, welcome traveler ${req.path}`);
    });

    test('the next function gets called', () => {
      logger(req, res, next);
    expect(next).toHaveBeenCalledWith();
    });
});