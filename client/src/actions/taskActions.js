import axios from "axios";
import {
  GET_TASKS,
  GET_ERRORS,
  DELETE_TASK,
  LOADING,
  DISABLED,
  ENABLED,
  EDIT_DISABLED,
} from "./types";

//POST TASK
export const addTask = (taskData) => (dispatch) => {
  console.log(taskData);

  axios
    .post("/api/tasks/new", taskData)
    .then((res) => dispatch(getTasks()))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//GET task
export const getTasks = () => (dispatch) => {
  dispatch(setLoading());
  axios.get("/api/tasks/all").then((res) =>
    dispatch({
      type: GET_TASKS,
      payload: res.data,
    })
  );
};

export const updateTask = (id, data) => (dispatch) => {
  axios
    .put(`/api/tasks/${id}`, data)
    .then(() => dispatch(getTasks()))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const deleteTask = (id) => (dispatch) => {
  axios
    .delete(`/api/tasks/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_TASK,
        payload: id,
      })
    )
    .catch((err) => console.log(err));
};

export const deleteAllTask = () => (dispatch) => {
  dispatch(enabled());
  axios
    .delete("/api/tasks/delete/all")
    .then((res) =>
      dispatch({
        type: GET_TASKS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const setLoading = () => {
  return {
    type: LOADING,
  };
};

export const disabled = () => {
  return {
    type: DISABLED,
  };
};

export const enabled = () => {
  return {
    type: ENABLED,
  };
};

export const editDisabled = () => {
  return {
    type: EDIT_DISABLED,
  };
};
