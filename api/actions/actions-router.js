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

router.get("/:id", validateActionId, (req, res) => {
  res.status(200).json(req.action);
});

router.post("/", [validateActionId, validateAction], (req, res) => {});

router.put("/:id", [validateActionId, validateAction], (req, res) => {
  Action.update(req.params.id, req.body)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ message: "Error updating the action" });
    });
});

router.delete("/:id", validateActionId, (req, res) => {
  Action.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: "The action has been deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ message: "Error removing the action" });
    });
});

// Middleware

function validateActionId(req, res, next) {
  Action.get(req.params.id)
    .then((action) => {
      if (action) {
        req.action = action;
        next();
      } else {
        res.status(400).json({ message: "Invalid action id" });
      }
    })
    .catch((err) => {
      console.log(err.message);
      req.status(500).json({ message: "Error retrieving the action" });
    });
}

function validateAction(req, res, next) {
  if (!req.body.description || !req.body.notes) {
    res.status(400).json({ message: "Please provide a description and notes" });
  } else {
    next();
  }
}

module.exports = router;
