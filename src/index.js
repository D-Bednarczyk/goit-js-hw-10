import { fetchCountries } from './js/fetchCountries';
import Notiflix from 'notiflix';
import './css/styles.css';
var _ = require('lodash');

const DEBOUNCE_DELAY = 300;
const searchEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchEl.addEventListener(
  'input',
  _.debounce(ev => {
    const trimmedValue = ev.target.value.trim();
    cleanInnerHTMLs();
    if (trimmedValue !== '') {
      fetchCountries(trimmedValue).then(returnedArray => {
        if (returnedArray.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (returnedArray.length === 0) {
          Notiflix.Notify.failure('Oops, there is no country with that name');
        } else if (returnedArray.length >= 2 && returnedArray.length <= 10) {
          listCountries(returnedArray);
        } else if (returnedArray.length === 1) {
          listCountry(returnedArray);
        }
      });
    }
  }, DEBOUNCE_DELAY)
);

function listCountries(countries) {
  const insert = countries
    .map(country => {
      return `<li>
        <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="45" hight="25">
           <b>${country.name.official}</p>
                  </li>`;
    })
    .join('');
  countryList.innerHTML = insert;
}

function listCountry(countries) {
  const insert = countries
    .map(country => {
      return `<li>
        <img src="${country.flags.svg}" alt="Flag of ${
        country.name.official
      }" width="50" hight="30">
           <b>${country.name.official}</b></p>
              <p><b>Capital</b>: ${country.capital}</p>
              <p><b>Population</b>: ${country.population}</p>
              <p><b>Languages</b>: ${Object.values(country.languages)} </p>
                  </li>`;
    })
    .join('');
  countryList.innerHTML = insert;
}

function cleanInnerHTMLs() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
