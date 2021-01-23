import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logoutUser, deleteAccount } from "../../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
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

  const AccountDelete = () => {
    setShowConfirmation(true);
  };

  const ConfirmClick = () => {
    setShow(false);
    setShowConfirmation(false);
    dispatch(deleteAccount());
  };

  const backClick = () => {
    setShow(false);
    setShowConfirmation(false);
  };

  const authLinks = (
    <div className="container d-flex" style={{ height: 45 }}>
      <h5>
        <a href="/">
          <i className="fa fa-code"></i> BTodo
        </a>
      </h5>
      <div style={{ marginTop: 5 }}>
        <p onClick={showMenu} style={{ color: "black" }} className="nav-link">
          <img
            className="rounded-circle"
            src={auth.user.avatar}
            alt={auth.user.name}
            style={{ marginLeft: "20px", width: "30px", color: "black" }}
            title="avatar"
          />{" "}
          {auth.user.firstname}
        </p>
        {show ? (
          <div className="menu">
            <p style={{ marginTop: 20, fontSize: 16 }} onClick={AccountDelete}>
              Delete account
            </p>
            <hr style={{ background: "black" }} />
            <p style={{ marginTop: 20, fontSize: 16 }} onClick={onLogoutClick}>
              Logout
            </p>
          </div>
        ) : null}
      </div>
      {showConfirmation ? (
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
            <h5 style={{ width: "80%", margin: "0 auto" }}>
              Are you sure you want to delete your account ?
            </h5>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex float-center">
              <Button variant="secondary" type="button" onClick={backClick}>
                Cancel
              </Button>
              <Button
                variant="primary"
                type="button"
                className="ml-2"
                onClick={ConfirmClick}
              >
                Yes
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      ) : null}
    </div>
  );
  const guestLinks = (
    <div className="container d-flex" style={{ height: 45 }}>
      <h5>
        <a href="/">
          <i className="fa fa-code"></i> BTodo
        </a>
      </h5>
      <div>
        <ul style={{ marginTop: 20 }}>
          <li>
            <Link to="/register" style={{ color: "black" }}>
              Register
            </Link>
            <span style={{ color: "black", margin: "0 5px" }}>/</span>
          </li>
          <li>
            <Link to="/login" style={{ color: "black" }}>
              Login
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
  return (
    <nav className="navbar" style={{ background: "#F2F3F4" }}>
      {auth.isAuthenticated ? authLinks : guestLinks}
    </nav>
  );
};

export default Navbar;
