import React, { useState, useEffect } from "react";
import { getTasks, deleteAllTask } from "../../actions/taskActions";
import TextFieldGroup from "../common/TextFieldGroup";
import { addTask, disabled, enabled } from "../../actions/taskActions";
import Task from "../task/Task";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = (props) => {
  const [description, setDescription] = useState("");

  const [state, setState] = useState({
    showConfirmation: false,
    showForm: false,
  });

  var opacity;
  var deleteDisabled = false;
  var addDisabled = false;

  const errors = useSelector((state) => state.errors);
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  useEffect(() => {
    errors.description = "";
  });

  const descriptionOnChange = (data) => {
    setDescription(data.target.value);
  };

  const showForm = (e) => {
    e.preventDefault();
    setState({
      showForm: true,
    });
    dispatch(disabled());
  };

  const showConfirmation = (e) => {
    dispatch(disabled());
    setState({
      showConfirmation: true,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      description: description,
      date: new Date().now,
    };

    setDescription("");
    dispatch(addTask(newTask));
  };

  const backClick = (e) => {
    setState({
      showForm: false,
      showConfirmation: false,
    });
    dispatch(enabled());
  };

  const deleteAll = (e) => {
    setState({
      showConfirmation: false,
    });
    dispatch(deleteAllTask());
  };

  if (
    (tasks.disabled && !tasks.editDisabled) ||
    (!tasks.disabled && tasks.editDisabled)
  ) {
    opacity = 0.5;
    deleteDisabled = true;
    addDisabled = true;
  } else {
    opacity = 1;
  }

  //for converting array
  let task = [];
  for (const [key, value] of Object.entries(tasks.tasks)) {
    task[key] = value;
  }

  if (task.length === 0) {
    deleteDisabled = true;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-sub">
        <h2 style={{ color: "#0D21A1", opacity: `${opacity}` }}>Todo List</h2>
        <hr
          style={{
            marginBottom: 10,
            background: "white",
            opacity: `${opacity}`,
          }}
        ></hr>

        <div className="dash-buttons" style={{ marginBottom: 30 }}>
          <button
            disabled={addDisabled}
            className="btn btn-primary mr-2"
            onClick={showForm}
          >
            Create Task
          </button>
          <button
            disabled={deleteDisabled}
            className="btn btn-danger"
            onClick={showConfirmation}
          >
            Delete All Task
          </button>
        </div>
        <Task />
      </div>
      {tasks.disabled ? (
        <div className="add-task">
          <button
            style={{
              fontSize: "50px",
              marginTop: -22,
              marginBottom: 25,
              outline: "none",
            }}
            type="button"
            className="close"
            aria-label="Close"
            onClick={backClick}
          >
            <span aria-hidden="true" style={{ color: "red" }}>
              &times;
            </span>
          </button>
          <h5 className="text-center text-success ml-4">Add task</h5>
          <hr style={{ background: "rgba(0,0,0,0.12)" }} />
          <form className="form" onSubmit={onSubmit}>
            <div className="form-group">
              <TextFieldGroup
                placeholder="Input your task ..."
                name="description"
                style={{ fontFamily: "monospace" }}
                value={description}
                onChange={descriptionOnChange}
                autoComplete="off"
                error={errors.description}
              />
              <button className="btn btn-primary" style={{ width: "100%" }}>
                Add
              </button>
            </div>
          </form>
        </div>
      ) : null}

      {state.showConfirmation ? (
        <div className="confirmation">
          <button
            style={{ fontSize: "50px", marginTop: -25, outline: "none" }}
            type="button"
            className="close"
            aria-label="Close"
            onClick={backClick}
          >
            <span aria-hidden="true" style={{ color: "red" }}>
              &times;
            </span>
          </button>
          <h5 style={{ marginTop: 40 }}>
            Are you sure you want to delete all ?
          </h5>
          <div style={{ dispaly: "inline", marginTop: 20 }}>
            <button
              style={{ width: "48%" }}
              className="btn btn-success"
              onClick={deleteAll}
            >
              Yes
            </button>
            <button
              style={{ width: "48%", marginLeft: 4 }}
              className="btn btn-danger"
              onClick={backClick}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Dashboard;
