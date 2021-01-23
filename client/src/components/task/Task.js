import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { Modal, Button } from "react-bootstrap";
import { updateTask, deleteTask, getTasks } from "../../actions/taskActions";
import TextFieldGroup from "../common/TextFieldGroup";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../common/Spinner";

const Task = (props) => {
  //variables
  const [buttonDisabled, setButtonDisabled] = useState("");
  const [state, setState] = useState({
    completed: false,
    _id: "",
    _idDelete: "",
    description: "",
    oldDescription: "",
    oldCompleted: false,
    showEditForm: false,
    showDeleteConfirmation: false,
    error: "",
  });

  const tasks = useSelector((state) => state.tasks);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const onChangeInput = (e) => {
    setState({
      ...state,
      completed: !state.completed,
    });
  };

  const onChangeField = (e) => {
    if (e.target.value === "") {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
    setState({
      ...state,
      description: e.target.value,
    });
  };

  const Edit = (com, des, id) => {
    setState({
      showForm: true,
      description: des,
      oldDescription: des,
      oldCompleted: com,
      completed: com,
      _id: id,
      showEditForm: true,
    });
  };

  const backClick = (e) => {
    setState({
      showEditForm: false,
      showDeleteConfirmation: false,
      error: "",
    });
  };

  const onSubmit = (id) => {
    if (buttonDisabled) {
      setState({ ...state, error: "Field is required" });
    } else {
      const newTask = {
        description: state.description,
        completed: state.completed,
        date: new Date(),
      };
      setState({ ...state, error: "", showEditForm: false });
      dispatch(updateTask(id, newTask));
    }
  };

  const onDelete = (id) => {
    setState({ ...state, showDeleteConfirmation: true, _idDelete: id });
  };

  const confirmClick = () => {
    setState({ ...state, showDeleteConfirmation: false });
    dispatch(deleteTask(state._idDelete));
  };

  //for converting array
  let task = [];
  for (const [key, value] of Object.entries(tasks.tasks)) {
    task[key] = value;
  }

  return (
    <div>
      {tasks.loading ? (
        <Spinner />
      ) : (
        <div>
          {task.length ? (
            <div className="task">
              {task.map((tsk, index) => (
                <div key={index} style={{ padding: "0 10px" }}>
                  <div
                    style={{
                      marginBottom: 5,
                      alignItems: "center",
                      height: "50px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p
                      style={{
                        color: "black",
                        fontSize: 18,
                        marginTop: 10,
                        fontFamily: "cursive",
                        textDecoration: tsk.completed ? "line-through" : "",
                      }}
                    >
                      {tsk.completed ? (
                        <i
                          className="fa fa-check"
                          style={{ color: "green" }}
                        ></i>
                      ) : (
                        <i
                          className="fa fa-check"
                          style={{ color: "white" }}
                        ></i>
                      )}{" "}
                      {tsk.description}
                    </p>
                    <div
                      style={{ display: "block", marginTop: -10 }}
                      className="edit-delete"
                    >
                      <button
                        onClick={(e) =>
                          Edit(tsk.completed, tsk.description, tsk._id)
                        }
                        style={{
                          background: "transparent",
                          outline: "none",
                          border: 0,
                        }}
                      >
                        <i
                          className="fa fa-edit fa-lg"
                          style={{
                            color: "#0FA3B1",
                          }}
                        ></i>
                      </button>
                      <button
                        onClick={(e) => onDelete(tsk._id)}
                        style={{
                          background: "transparent",
                          outline: "none",
                          border: 0,
                        }}
                      >
                        <i
                          className="fa fa-trash fa-lg"
                          style={{ color: "#DE6C83" }}
                        ></i>
                      </button>
                    </div>
                  </div>
                  <p
                    className="text-muted"
                    style={{
                      fontStyle: "italic",
                      fontSize: 12,
                      float: "right",
                      marginTop: -15,
                      marginRight: 5,
                    }}
                  >
                    <Moment format="DD-MM-YYYY HH:mm:ss">{tsk.date}</Moment>
                  </p>

                  <hr />
                </div>
              ))}{" "}
            </div>
          ) : (
            <div>
              <h4
                style={{
                  color: "white",
                  fontFamily: "monospace",
                }}
              >
                No task yet, create your task..
              </h4>
            </div>
          )}

          {/* Edit div */}
          {state.showEditForm ? (
            <Modal
              show={true}
              onHide={backClick}
              keyboard={false}
              animation={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Edit Task</Modal.Title>
              </Modal.Header>

              <form
                className="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  onSubmit(state._id, tasks);
                }}
              >
                <Modal.Body>
                  <div className="form-group" style={{ textAlign: "left" }}>
                    <TextFieldGroup
                      placeholder={state.description}
                      name="description"
                      style={{ fontFamily: "monospace" }}
                      value={state.description}
                      onChange={onChangeField}
                      autoComplete="off"
                      error={state.error}
                    />
                    <div style={{ float: "left", marginTop: -10 }}>
                      <input
                        defaultChecked={state.completed}
                        type="checkbox"
                        style={{ width: 15, height: 15 }}
                        name="completed"
                        value={state.completed}
                        onChange={onChangeInput}
                      />
                      <span> Completed</span>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer style={{ marginTop: 20 }}>
                  <div className="d-flex">
                    <Button variant="danger" onClick={backClick}>
                      Cancel
                    </Button>
                    <Button variant="primary" type="submit" className="ml-2">
                      Update
                    </Button>
                  </div>
                </Modal.Footer>
              </form>
            </Modal>
          ) : null}
          {state.showDeleteConfirmation ? (
            <Modal
              show={true}
              onHide={backClick}
              keyboard={false}
              animation={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
              </Modal.Header>

              <Modal.Body className="text-center">
                <h5 style={{ width: "85%", margin: "0 auto" }}>
                  Are you sure you want to delete this task ?
                </h5>
              </Modal.Body>
              <Modal.Footer>
                <div className="d-flex float-center">
                  <Button variant="danger" type="button" onClick={backClick}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    type="button"
                    className="ml-2"
                    onClick={confirmClick}
                  >
                    Yes
                  </Button>
                </div>
              </Modal.Footer>
            </Modal>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Task;
