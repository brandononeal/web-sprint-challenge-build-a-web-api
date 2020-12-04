//  When adding an action, make sure the project_id provided belongs to an existing project.

// If you try to add an action with an id of 3 and there is no project with that id the database will return an error.

const express = require("express");
const router = express.Router();

const Action = require("./actions-model");

// Endpoints

router.get("/", (req, res) => {
  Action.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ message: "The actions could not be retrieved" });
    });
});

router.get("/:id", (req, res) => {
  //
});

router.post("/", (req, res) => {
  //
});

router.put("/:id", (req, res) => {
  //
});

router.delete("/:id", (req, res) => {
  //
});

// Middleware

// validateActionId

module.exports = router;
