import { ADD_EXPENSE, REQUEST_FETCH, START_EDIT, FINISH_EDIT,
  FETCH_CURRENCIES_SUCESS, FETCH_CURRENCIES_FAILURE, DELETE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  isFetching: false,
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,

};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_FETCH:
    return {
      ...state,
      isFetching: true,
    };

  case FETCH_CURRENCIES_SUCESS:
    return {
      ...state,
      currencies: action.payload,
      isFetching: false,
    };

  case FETCH_CURRENCIES_FAILURE:
    return {
      ...state,
      isFetching: false,
    };

  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };

  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [...action.payload],
    };

  case START_EDIT:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };

  case FINISH_EDIT:
    return {
      ...state,
      expenses: action.payload,
      editor: false,
      idToEdit: 0,
    };

  default: return state;
  }
};

export default walletReducer;
