import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import { useDispatch, useSelector } from "react-redux";

const Login = (props) => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const errors = useSelector((state) => state.errors);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    errors.notFound = "";
    errors.loginEmail = "";
    errors.loginPassword = "";
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.isAuthenticated) {
      props.history.push("/dashboard");
    }
  });
  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      loginEmail: state.email,
      loginPassword: state.password,
    };

    dispatch(loginUser(data));
  };
  return (
    <section
      className="container"
      style={{
        marginTop: "95px",
      }}
    >
      <div className="row mx-auto login-container">
        <div className="col-md-12 mx-auto log">
          <h3 className="large text-light text-center">
            <i className="fa fa-user"></i> Sign In
          </h3>
          <hr />
          {errors.notFound ? (
            <div className="alert alert-danger">{errors.notFound}</div>
          ) : null}
          <form className="form" onSubmit={onSubmit} style={{ marginTop: 10 }}>
            <TextFieldGroup
              autoComplete="off"
              placeholder="Email Address"
              name="email"
              value={state.email}
              onChange={onChange}
              error={errors.loginEmail}
            />
            <TextFieldGroup
              autoComplete="off"
              type="password"
              placeholder="Password"
              name="password"
              value={state.password}
              onChange={onChange}
              error={errors.loginPassword}
            />
            {auth.isLoading ? (
              <button type="button" className="btn btn-primary" disabled={true}>
                <i className="fa fa-circle-o-notch fa-spin"> </i> {""}{" "}
                Loading...
              </button>
            ) : (
              <button type="submit" className="btn btn-success">
                Login
              </button>
            )}
          </form>
          <p className="my-2 text-default" style={{ fontSize: 15 }}>
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{ fontWeight: "bold", fontSize: 15, color: "black" }}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};
export default Login;
