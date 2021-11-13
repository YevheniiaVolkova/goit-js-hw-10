import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import countriesListTemplate from './template/list.hbs';
import countryCardTemplate from './template/card.hbs';
import CountriesApiService from './js/new';
import 'animate.css';
const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryCard: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
const countriesApiService = new CountriesApiService();

function onSearch(e) {
  if (e.target.value.trim() === '') {
    clearMarkup();
    return;
  }
  clearMarkup();

  countriesApiService.query = e.target.value.trim();

  countriesApiService.fetchCards().then(checkDataLength).catch(Notify.failure);
}

function checkDataLength(countries) {
  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (countries.length >= 2 && countries.length <= 10) {
    appendCountryListMarkup(countries);
  } else if (countries.length === 1) {
    appendCountryCardMarkup(countries);
  }
}

function appendCountryCardMarkup(countries) {
  refs.countryCard.insertAdjacentHTML('beforeend', countryCardTemplate(...countries));
}
function appendCountryListMarkup(countries) {
  refs.countryList.insertAdjacentHTML('beforeend', countriesListTemplate({ ...countries }));
}

function clearMarkup() {
  refs.countryList.innerHTML = '';
  refs.countryCard.innerHTML = '';
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


