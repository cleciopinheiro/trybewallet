import { SET_CURRENCY } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_CURRENCY: {
    return {
      ...state,
      currencies: action.payload,
    };
  }
  default: return state;
  }
};

export default walletReducer;
