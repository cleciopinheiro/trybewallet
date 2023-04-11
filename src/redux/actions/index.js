import getFetch from '../../services/currenciesApi';

export const USER_EMAIL = 'USER_EMAIL';

export const userEmail = (email) => ({
  type: USER_EMAIL,
  payload: email,
});

export const SET_CURRENCY = 'SET_CURRENCY';

export const fetchCurrencies = () => async (dispatch) => {
  const data = await getFetch();
  const coins = Object.keys(data);
  const filterCoins = coins.filter((coin) => coin !== 'USDT');
  dispatch({
    type: SET_CURRENCY,
    payload: filterCoins,
  });
};
