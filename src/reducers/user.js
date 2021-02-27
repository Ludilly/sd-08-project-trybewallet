// Esse reducer será responsável por tratar as informações da pessoa usuária
import { Types } from '../actions';

function user(state = {}, action) {
  switch (action.type) {
  case Types.SAVE_EMAIL:
    return { ...state, email: action.payload };
  default:
    return state;
  }
}

export default user;
