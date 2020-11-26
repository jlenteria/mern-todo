import {
  ADD_TASK,
  GET_TASKS,
  DELETE_TASK,
  LOADING,
  DISABLED,
  ENABLED,
  EDIT_DISABLED,
} from "../actions/types";

const initialState = {
  tasks: {},
  loading: false,
  disabled: false,
  enabled: false,
  editDisabled: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        task: action.payload,
      };
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        loading: false,
        enabled: true,
        disabled: false,
        editDisabled: false,
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      };

    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case DISABLED:
      return {
        ...state,
        disabled: true,
      };

    case ENABLED:
      return {
        ...state,
        disabled: false,
        enabled: true,
        editDisabled: false,
      };

    case EDIT_DISABLED:
      return {
        ...state,
        editDisabled: true,
      };
    default:
      return state;
  }
}
