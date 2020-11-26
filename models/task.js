const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model("tasks", taskSchema);

module.exports = Task;
