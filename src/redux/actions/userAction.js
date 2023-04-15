import { LOGIN_ACESS } from '.';

export const loginAcess = (email) => ({
  type: LOGIN_ACESS,
  payload: email,
});
