import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import {
  updateTask,
  deleteTask,
  getTasks,
  enabled,
  editDisabled,
} from "../../actions/taskActions";
import TextFieldGroup from "../common/TextFieldGroup";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../common/Spinner";

const Task = (props) => {
  //variables
  const [error, setError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [state, setState] = useState({
    completed: false,
    _id: "",
    description: "",
    oldDescription: "",
    oldCompleted: false,
  });

  var opacity;
  var pointerEvents = "all";

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
    });
    dispatch(editDisabled());
  };

  const backClick = (e) => {
    dispatch(enabled());
  };

  const onSubmit = (id) => {
    if (
      state.description === state.oldDescription &&
      state.completed === state.oldCompleted
    ) {
      dispatch(enabled());
    } else {
      if (buttonDisabled) {
        setError("Field is required");
      } else {
        const newTask = {
          description: state.description,
          completed: state.completed,
          date: new Date(),
        };
        setError("");
        dispatch(updateTask(id, newTask));
      }
    }
  };

  const onDelete = (id) => {
    dispatch(deleteTask(id));
  };

  if (
    (tasks.editDisabled && !tasks.disabled) ||
    (!tasks.editDisabled && tasks.disabled)
  ) {
    pointerEvents = "none";
  }

  //setting opacity
  if (
    (tasks.editDisabled && !tasks.disabled) ||
    (!tasks.editDisabled && tasks.disabled)
  ) {
    opacity = 0.5;
  } else {
    opacity = 1;
  }
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
            <div className="task" style={{ opacity: `${opacity}` }}>
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
                          pointerEvents: `${pointerEvents}`
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
                          pointerEvents: `${pointerEvents}`
                        }}
                      >
                        <i
                          className="fa fa-trash fa-lg"
                          style={{color: "#DE6C83" }}
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
          {tasks.editDisabled ? (
            <div className="edit-task">
              <button
                style={{
                  fontSize: "50px",
                  marginTop: -22,
                  marginBottom: 20,
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
              <h5 className="text-center text-success ml-4">Edit task</h5>
              <hr style={{ background: "rgba(0,0,0,0.12)" }} />

              <form
                className="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  onSubmit(state._id, tasks);
                }}
              >
                <div className="form-group" style={{ textAlign: "left" }}>
                  <TextFieldGroup
                    placeholder={state.description}
                    name="description"
                    style={{ fontFamily: "monospace" }}
                    value={state.description}
                    onChange={onChangeField}
                    autoComplete="off"
                    error={error}
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

                  <button
                    type="submit"
                    disabled={state.disabled}
                    className="btn btn-primary"
                    style={{ width: "100%", marginTop: 10 }}
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Task;
