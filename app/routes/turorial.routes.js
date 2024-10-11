module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");
  const comments = require("../controllers/comment.controller.js"); //täytyy vissiin muistaa importata kommenttien controller :D

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", tutorials.create);

  // Retrieve all Tutorials
  router.get("/", tutorials.findAll);

  // Retrieve all published Tutorials
  router.get("/published", tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", tutorials.findOne);

  // Update a Tutorial with id
  router.put("/:id", tutorials.update);

  // Delete a Tutorial with id
  router.delete("/:id", tutorials.delete);

  // Delete all Tutorials
  router.delete("/", tutorials.deleteAll);

// Route for creating a comment
  router.post('/comments/:tutorialId', comments.create);

// Route for fetching all comments for a tutorial
  router.get('/comments/:tutorialId', comments.findAll);



 


  app.use('/api/tutorials', router);
};
