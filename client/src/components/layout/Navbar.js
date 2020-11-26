import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logoutUser, deleteAccount } from "../../actions/authActions";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const showMenu = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  const onLogoutClick = (e) => {
    setShow(false);
    dispatch(logoutUser());
  };

  const AccountDelete = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete your account?")) {
      setShow(false);
      dispatch(deleteAccount());
    }
  };

  const authLinks = (
    <div className="dashboard-nav">
      <h3>
        <a href="/" style={{ color: "white" }}>
          <i className="fa fa-code"></i> BTodo
        </a>
      </h3>
      <div style={{ marginTop: 5 }}>
        <p onClick={showMenu} style={{ color: "white" }} className="nav-link">
          <img
            className="rounded-circle"
            src={auth.user.avatar}
            alt={auth.user.name}
            style={{ marginLeft: "20px", width: "30px", color: "white" }}
            title="avatar"
          />{" "}
          {auth.user.firstname}
        </p>
        {show ? (
          <div className="menu">
            <p style={{ marginTop: 20, fontSize: 16 }} onClick={AccountDelete}>
              Delete account
            </p>
            <hr style={{ background: "white" }} />
            <p style={{ marginTop: 20, fontSize: 16 }} onClick={onLogoutClick}>
              Logout
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
  const guestLinks = (
    <div
      className="dashboard-nav"
      style={{
        display: "flex",
        width: "90%",
        margin: "0 auto",
        justifyContent: "space-between",
      }}
    >
      <h3>
        <a href="/" style={{ color: "white" }}>
          <i className="fa fa-code"></i> BTodo
        </a>
      </h3>
      <div>
        <ul style={{ marginTop: 20 }}>
          <li>
            <Link to="/register">Register</Link>
            <span style={{ color: "white", margin: "0 5px" }}>/</span>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </div>
  );
  return (
    <nav className="navbar" style={{ background: "#03012c" }}>
      {auth.isAuthenticated ? authLinks : guestLinks}
    </nav>
  );
};

export default Navbar;
