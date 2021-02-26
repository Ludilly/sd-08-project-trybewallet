import * as ActionTypes from "../common/ActionTypes";

const INITIAL_STATE = {
  email: "",
};

export default function reducer(state = INITIAL_STATE, action = null) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.USER_LOGIN:
      return {
        ...state,
        email: payload,
      };
    case ActionTypes.USER_LOGOUT:
      return {
        ...state,
        email: "",
      };
    default:
      return state;
  }
}
