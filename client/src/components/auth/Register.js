import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup.js";
import { useDispatch, useSelector } from "react-redux";

const Register = (props) => {
  const [state, setState] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password2: "",
    errors: {},
  });

  const auth = useSelector((state) => state.auth);
  const errors = useSelector((state) => state.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.isAuthenticated) {
      props.history.push("/dashboard");
    }
    errors.firstname = "";
    errors.lastname = "";
    errors.email = "";
    errors.password = "";
    errors.password2 = "";
  });

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      firstname: state.firstname,
      lastname: state.lastname,
      email: state.email,
      password: state.password,
      password2: state.password2,
    };
    dispatch(registerUser(userData, props.history));
  };
  return (
    <div>
      <section
        className="container signup-container"
        style={{ marginTop: "50px"}}
      >
        <div className="row">
          <div className="col-md-12 m-auto">
            <h2 className="large text-primary text-center">
              <i className="fa fa-user"></i>
              {""} Sign Up
            </h2>
            <hr />
            <form
              noValidate
              className="form"
              onSubmit={onSubmit}
              style={{ marginTop: 10 }}
            >
              <TextFieldGroup
                placeholder="First Name"
                name="firstname"
                value={state.firstname}
                onChange={onChange}
                autoComplete="off"
                error={errors.firstname}
              />
              <TextFieldGroup
                placeholder="Last Name"
                name="lastname"
                autoComplete="off"
                value={state.lastname}
                onChange={onChange}
                error={errors.lastname}
              />
              <TextFieldGroup
                autoComplete="on"
                placeholder="Email Address"
                name="email"
                value={state.email}
                onChange={onChange}
                error={errors.email}
                info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
              />
              <TextFieldGroup
                autoComplete="off"
                type="password"
                placeholder="Password"
                name="password"
                value={state.password}
                onChange={onChange}
                error={errors.password}
              />
              <TextFieldGroup
                autoComplete="off"
                type="password"
                placeholder="Confirm password"
                name="password2"
                value={state.password2}
                onChange={onChange}
                error={errors.password2}
              />
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </form>
            <p className="my-1">
              Already have an account?{" "}
              <Link to="/login" style={{ fontWeight: "bold" }}>
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
