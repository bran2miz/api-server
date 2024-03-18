'use strict';

const { afterEach } = require('node:test');
const {validateHello} = require('../src/middleware/validate.js');

describe('test the validator middleware', () => {
  let consoleSpy;
  let req = {path: '/test'};
  let res = {};
  let next = jest.fn();


  beforeEach(() => {
    consoleSpy =jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });
  
  test('it should call next if a name is given', () => {
    validateHello({query:{name:'John'}},res,next);
    expect(next).toHaveBeenCalledWith();
  });

});