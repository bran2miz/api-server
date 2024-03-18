'use strict';

module.exports = (req,res,next) => {
  console.log(`Hello, welcome traveler ${req.path}`);
  next();
};


// for consistency you should have this formatted similar to your getBrowser middleware where theres a function declaration, then exported via module.exports at the bottom, or vice versa.  Think this is the only place I found where there's an anonymous function