function validateHello(req, res, next) {
    if (!req.query.name) {
      next(new Error("Hey! You were supposed to give us your name"));
    } else {
      next();
    }
  }
  
  function handleHello(req, res) {
    res.send(`Hello, ${req.query.name}`);
  }
  
  module.exports = { validateHello, handleHello };