const getFetchAPI = async () => {
  const URL = 'https://economia.awesomeapi.com.br/json/all';
  const api = await fetch(URL);
  const data = await api.json();
  delete data.USDT;
  return data;
};

export default getFetchAPI;
