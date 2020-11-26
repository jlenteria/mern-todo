const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateTaskInput(data) {
  let errors = {};

  data.description = !isEmpty(data.description) ? data.description : "";

  if (validator.isEmpty(data.description)) {
    errors.description = "Field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
