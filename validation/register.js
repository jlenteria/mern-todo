const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (validator.isEmpty(data.firstname)) {
    errors.firstname = "First name is required";
  } else if (!validator.isLength(data.firstname, { min: 2, max: 30 })) {
    errors.firstname = "Invalid name";
  }

  if (validator.isEmpty(data.lastname)) {
    errors.lastname = "Last name is required";
  } else if (!validator.isLength(data.lastname, { min: 2, max: 30 })) {
    errors.lastname = "Invalid name";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email address is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Invalid email";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  } else if (!validator.isLength(data.password, { min: 6 })) {
    errors.password = "Password must be atleast 6 characters";
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password is required";
  } else if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Password not match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
