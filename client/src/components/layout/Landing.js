import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Landing = (props) => {
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.isAuthenticated) {
      props.history.push("/dashboard");
    }
  });

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1
            className="x-large"
            style={{ color: "#0D21A1", fontWeight: "bold" }}
          >
            Todo App with Account
          </h1>
          <p
            style={{
              color: "#000",
              fontWeight: "bold",
              fontSize: 16,
              fontFamily: "monospace",
            }}
          >
            Create your todo list ...
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-success ml-2">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
