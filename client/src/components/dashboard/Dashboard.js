import React, { useState, useEffect } from "react";
import {Modal,Button} from 'react-bootstrap';
import { getTasks, deleteAllTask } from "../../actions/taskActions";
import TextFieldGroup from "../common/TextFieldGroup";
import { addTask, disabled, enabled } from "../../actions/taskActions";
import Task from "../task/Task";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = (props) => {
  const [state, setState] = useState({
    showConfirmation: false,
    description: ""
  });

  var deleteDisabled = false;
  const errors = useSelector((state) => state.errors);
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  useEffect(() => {
    errors.description = "";
  });

  const descriptionOnChange = (text) =>e => {
    setState({[text]: e.target.value})
  };

  const showForm = (e) => {
    dispatch(disabled());
  };

  const showConfirmationDelete= (e) => {
    setState({
      showConfirmation: true,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      description: state.description,
      date: new Date().now,
    };

    setState({description: ""})
    dispatch(addTask(newTask));
  };

  const backClick = (e) => {
    setState({
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
        <h2 style={{ color: "#0D21A1"}}>Todo List</h2>
        <hr
          style={{
            marginBottom: 10,
            background: "white",
          }}
        ></hr>

        <div className="dash-buttons" style={{ marginBottom: 30 }}>
          <button
            className="btn btn-primary mr-2"
            onClick={showForm}
          >
            Create Task
          </button>
          <button
            disabled={deleteDisabled}
            className="btn btn-danger"
            onClick={showConfirmationDelete}
          >
            Delete All Task
          </button>
        </div>
        <Task />
      </div>
      {tasks.disabled ? (
        <Modal show={true} onHide = {backClick} keyboard = {false} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Add Task</Modal.Title>
          </Modal.Header>
          <form className="form" onSubmit={onSubmit}>

          <Modal.Body>
              <div className="form-group">
                <TextFieldGroup
                  placeholder="Input your task ..."
                  name="description"
                  style={{ fontFamily: "monospace" }}
                  value={state.description}
                  onChange={descriptionOnChange("description")}
                  autoComplete="off"
                  error={errors.description}
                />
              </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex">
              <Button variant="secondary" onClick={backClick}>
              Cancel
            </Button>
              <Button variant="primary" type="submit" className="ml-2">
                Post
              </Button>
            </div>
          </Modal.Footer>
          </form>
        </Modal>
      ) : null}

      {state.showConfirmation ? (
        <Modal show={true} onHide = {backClick} keyboard = {false} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h5>Are you sure you want to delete your tasks?</h5>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex">
            <Button variant="secondary" onClick={backClick}>
            Cancel
          </Button>
            <Button variant="primary" type="button" onClick={deleteAll} className="ml-2">
              Yes
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
      ) : null}
    </div>
  );
};

export default Dashboard;
