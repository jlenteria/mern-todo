import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, LOADING } from "./types";
import {toast} from 'react-toastify';

//Register
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    .then(() => {
      setTimeout(() => {
        history.push("/login");
      }, 1000);
      toast.success("Successfully Registered");

    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Login - Get User Token
export const loginUser = (userData) => (dispatch) => {
  if (userData !== null) {
    dispatch(setLoading());
  }
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      setTimeout(() => {
        toast.success("Successfully Login");
      }, 200);
        //Save to localStorage
        const { token } = res.data;
        //set Token to ls
        localStorage.setItem("jwtToken", token);
        //Set to Auth header
        setAuthToken(token);
        //Decode token to get user data
        const decoded = jwt_decode(token);
        //Set Current user
        dispatch(setCurrentUser(decoded));
    
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Delete Account
export const deleteAccount = () => (dispatch) => {
  axios.delete("/api/users/delete").then(() =>{
    setTimeout(() => {
      dispatch({
        type: SET_CURRENT_USER,
        payload: {},
      })
    }, 1500);
    toast.error("Account Deleted, Logging out ...", {autoClose: 1000})
  }

  );
};

//Set logged in user

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

//Log user out
export const logoutUser = () => (dispatch) => {

  setTimeout(() => {
    //remove token from localstorage
  localStorage.removeItem("jwtToken");
  //remove auth header for future requests
  setAuthToken(false);
  //Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  }, 1500);
  toast.error("Logging out ...", {
    autoClose: 1500,
    progress: undefined,
  })
};

export const setLoading = () => {
  return {
    type: LOADING,
  };
};
