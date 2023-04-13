import fetchCurrenciesApi from '../../services/currenciesApi';

export const LOGIN_EMAIL = 'LOGIN_EMAIL';
export const FETCH_CURRENCIES_SUCESS = 'FETCH_CURRENCIES_SUCESS';
export const FETCH_CURRENCIES_FAILURE = 'FETCH_CURRENCIES_FAILURE';
export const REQUEST_FETCH = 'REQUEST_FETCH';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const START_EDIT = 'START_EDIT';
export const FINISH_EDIT = 'FINISH_EXPENSE';

export const loginEmail = (email) => ({
  type: LOGIN_EMAIL,
  payload: email,
});

export const requestFetch = () => ({
  type: REQUEST_FETCH,
});

export const fetchCurrenciesSucess = (currency) => ({
  type: FETCH_CURRENCIES_SUCESS,
  payload: Object.keys(currency),
});

export const fetchCurrenciesFailure = (errorMessage) => ({
  type: FETCH_CURRENCIES_FAILURE,
  payload: {
    errorMessage,
  },
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});

export const deleteExpense = (payload) => ({
  type: DELETE_EXPENSE,
  payload,
});

export const editExpenseStart = (payload) => ({
  type: START_EDIT,
  payload,
});

export const editExpenseFinish = (payload) => ({
  type: FINISH_EDIT,
  payload,
});

export const SET_CURRENCY = 'SET_CURRENCY';

export const fetchCurrenciesThunk = () => async (dispatch) => {
  dispatch(requestFetch);
  try {
    const currencies = await fetchCurrenciesApi();
    dispatch(fetchCurrenciesSucess(currencies));
  } catch (error) {
    dispatch(fetchCurrenciesSucess('Algo deu errado!'));
  }
};

export const fetchExchangeThunk = (state) => async (dispatch) => {
  const currencies = await fetchCurrenciesApi();
  dispatch(addExpense({ ...state, exchangeRates: currencies }));
};
