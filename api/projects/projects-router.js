const express = require("express");
const router = express.Router();

const Project = require("./projects-model");

// Endpoints

router.get("/", (req, res) => {
  Project.get()
    .then((projects) => {
      console.log(projects);
      res.status(200).json(projects);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ message: "The projects could not be retrieved" });
    });
});

router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

router.get("/:id/actions", validateProjectId, (req, res) => {
  Project.getProjectActions(req.params.id)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .json({ message: "The project actions could not be retrieved" });
    });
});

router.post("/", validateProject, (req, res) => {
  Project.insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ message: "Error creating the project" });
    });
});

router.put("/:id", [validateProjectId, validateProject], (req, res) => {
  Project.update(req.params.id, req.body)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ message: "Error updating the project" });
    });
});

router.delete("/:id", validateProjectId, (req, res) => {
  Project.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: "The project has been removed" });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ message: "Error removing the project" });
    });
});

// Middleware

function validateProjectId(req, res, next) {
  Project.get(req.params.id)
    .then((project) => {
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(404).json({ message: "Invalid project id" });
      }
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ message: "Error retrieving the project" });
    });
}

function validateProject(req, res, next) {
  if (!req.body.name || !req.body.description) {
    res.status(400).json({ message: "Please provide name and description" });
  } else {
    next();
  }
}

module.exports = router;
