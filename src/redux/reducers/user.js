import { LOGIN_ACESS } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_ACESS: {
    return {
      ...state,
      email: action.payload,
    };
  }
  default: return state;
  }
};

export default user;
