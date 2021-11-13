const BASE_URL = 'https://restcountries.com/v3.1/name/';
const FILTER_SETTINGS = 'fields=name,capital,population,flags,languages';

export default class CountriesApiService {
  constructor() {
    this.searchQuery = '';
  }

  fetchCards() {
    const url = `${BASE_URL}${this.searchQuery}?${FILTER_SETTINGS}`;

    return fetch(url).then(response => {
      if (!response.ok) {
        return Promise.reject('Oops, there is no country with that name');
      }
      return response.json();
    });
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}