import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(getCountry, DEBOUNCE_DELAY));

function getCountry(event) {
  let countryName = event.target.value.toLowerCase().trim();

  if (countryName.length === 0) {
    countryList.insertAdjacentHTML = '';
    countryInfo.insertAdjacentHTML = '';
    return;
  } 
  

  fetchCountries(countryName)
    .then(countries => createCountry(countries))
    .catch(error =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}
function createCountry(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  } else if (countries.length === 1) {
    countryList.innerHTML = '';
    countryInfoMarkUp(countries[0]);
  } else {
    createListMarkup(countries);
    countryInfo.innerHTML = '';
  }
}

function countryInfoMarkUp(country) {
  const languages = Object.values(country.languages);
  return (countryInfo.innerHTML = `
      <span class="country-item">
        <img class="country-logo" src="${country.flags.svg}" alt="flag-icon" width="25">
        <h1 class="country-name">${country.name.official}</h1>
      </span>
      <ul class="country-list">
      <li class="country-item">
        <span class="country-title">Capital:</span>${country.capital}</li>
      <li class="country-item">
        <span class="country-title">Population:</span>${country.population}</li>
      <li class="country-item">
        <span class="country-title">Languages:</span>${languages}</li>
      </ul>
    `);
}

function createListMarkup(countries) {
  return (countryList.innerHTML = countries
    .map(
      country => `
      <li class="country-item">
        <img class="country-logo" src="${country.flags.svg}" alt="flag-icon" width="25">
        <p class="country-name">${country.name.official}</p>
      </li>`
    )
    .join(''));
}
