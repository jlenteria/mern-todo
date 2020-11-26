import { SET_CURRENT_USER, LOADING, GET_ERRORS } from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        isLoading: false,
      };

    case GET_ERRORS:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}
