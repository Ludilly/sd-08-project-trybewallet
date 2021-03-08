export default async function getCurrencyList() {
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((res) => res.json())
    .then((data) => Object.keys(data).filter((i) => i !== 'USDT'));
}

export function fetchCurrency() {
  return async () => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((currency) => currency);
}
