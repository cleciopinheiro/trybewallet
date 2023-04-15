import { ADD_EXPENSES, DELETE_EXPENSES, EDIT_EXPENSE_FINISH,
  EDIT_EXPENSE_START, REQUEST_API_SUCESS } from '../actions';

const INITIAL_STATE = {
  isLoading: false,
  currencies: [],
  expenses: [],
  idToEdit: 0,
  editor: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API_SUCESS: {
    return {
      ...state,
      isLoading: false,
      currencies: Object.keys(action.payload),
    };
  }
  case ADD_EXPENSES: {
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  }
  case DELETE_EXPENSES: {
    return {
      ...state,
      expenses: [...action.payload],
    };
  }
  case EDIT_EXPENSE_START: {
    return {
      ...state,
      idToEdit: action.payload,
      editor: true,
    };
  }
  case EDIT_EXPENSE_FINISH: {
    return {
      ...state,
      expenses: action.payload,
      editor: false,
      idToEdit: 0,
    };
  }

  default: return state;
  }
};

export default wallet;
