const express = require("express");
const router = express.Router();
const auth = require("../config/auth");

//Load models
const Task = require("../models/task");

//Validation
const validateTaskInput = require("../validation/task");

router.post("/new", auth, (req, res) => {
  const { errors, isValid } = validateTaskInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newTask = new Task({
    ...req.body,
    owner: req.user._id,
  });

  newTask
    .save()
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((e) => res.status(400).json(e));
});

router.get("/all", auth, (req, res) => {
  req.user
    .populate({ path: "tasks", options: { sort: { date: 1 } } })
    .execPopulate()
    .then(() => {
      res.json(req.user.tasks);
    });
});

router.get("/:id", auth, (req, res) => {
  const _id = req.params.id;

  Task.findOne({ _id, owner: req.user._id }).then((task) => {
    res.json(task);
  });
});

router.put("/:id", auth, (req, res) => {
  const updates = Object.keys(req.body);

  Task.findOne({
    _id: req.params.id,
    owner: req.user._id,
  })
    .then((task) => {
      if (!task) {
        return res.status(404).send();
      }
      updates.forEach((update) => (task[update] = req.body[update]));
      task.save();
      res.json(task);
    })
    .catch((e) => {
      res.status(400).json(e);
    });
});

router.delete("/:id", auth, (req, res) => {
  Task.findOne({ _id: req.params.id, owner: req.user._id })
    .then((task) => {
      task.remove().then(() => res.json({ success: true }));
    })
    .catch((e) => res.status(404).json({ tasknotfound: "No Task found" }));
});

router.delete("/delete/all", auth, (req, res) => {
  Task.deleteMany({ owner: req.user._id }).then(() => {
    res.status(200).json({ success: true });
  });
});

module.exports = router;
