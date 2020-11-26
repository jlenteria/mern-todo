import axios from "axios";
import {toast} from 'react-toastify'
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
    .then((res) => {
      setTimeout(() => {
        dispatch(getTasks());
      }, 100);
      toast.success("Todo added", {autoClose: 1500});
    })
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
    .then(() => {
        setTimeout(() => {
          dispatch(getTasks());
        }, 100);
        toast.success("Todo updated",{autoClose: 1500});
      })
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
      {
        setTimeout(() => {
          dispatch({
            type: DELETE_TASK,
            payload: id,
          })
        }, 1500);
      toast.success("Todo deleted",{autoClose: 1500})
    })
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
