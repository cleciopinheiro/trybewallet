import { ADD_EXPENSES, DELETE_EXPENSES, EDIT_EXPENSE_FINISH, EDIT_EXPENSE_START,
  REQUEST_API_SUCESS } from '.';
import getFetchAPI from '../../services/fetchAPI';

export const requestApiSucess = (payload) => ({
  type: REQUEST_API_SUCESS,
  payload,
});

export const addExpenses = (payload) => ({
  type: ADD_EXPENSES,
  payload,
});

export const deleteExpenses = (payload) => ({
  type: DELETE_EXPENSES,
  payload,
});

export const editStart = (payload) => ({
  type: EDIT_EXPENSE_START,
  payload,
});

export const editFinish = (payload) => ({
  type: EDIT_EXPENSE_FINISH,
  payload,
});

export const fetchCurrencies = () => async (dispatch) => {
  const currencies = await getFetchAPI();
  dispatch(requestApiSucess(currencies));
};

export const fetchExchanges = (state) => async (dispatch) => {
  const currencies = await getFetchAPI();
  dispatch(addExpenses({ ...state, exchangeRates: currencies }));
};
