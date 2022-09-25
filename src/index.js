import './css/styles.css';
import API from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputRef: document.querySelector('#search-box'),
  listRef: document.querySelector('.country-list'),
  infoRef: document.querySelector('.country-info'),
};

refs.inputRef.addEventListener(
  'input',
  debounce(onInputSearchCountry, DEBOUNCE_DELAY)
);

function onInputSearchCountry(e) {
  const { value } = e.target;
  const normalizedValue = value.trim().toLowerCase();
  console.log(normalizedValue);
  if (normalizedValue === '') {
    refs.listRef.innerHTML = '';
    refs.infoRef.innerHTML = '';
    return;
  }

  const findCountry = countries.filter(({ name }) =>
    name.toLowerCase().includes(normalizedValue)
  );
  if (findCountry.length > 1) {
    const markupList = createCountriesList(findCountry[0]);
    refs.listRef.innerHTML = markupList;
    refs.infoRef.innerHTML = '';
    return;
  }
  if (findCountry.length === 1) {
    const markupOneCountry = createCountryInformation(findCountry);
    refs.infoRef.innerHTML = markupOneCountry;
    refs.listRef.innerHTML = '';
    return;
  }
  if (findCountry.length === 0) {
    Notiflix.Notify.failure('"Oops, there is no country with that name"');
    refs.listRef.innerHTML = '';
    refs.infoRef.innerHTML = '';
  }
}

function createCountriesList(countries) {
  return countries
    .map(
      ({ flag, name }) => `<li>
		<p>${flag}</p>
		<p>${name}</p></li>`
    )
    .join('');
}

function createCountryInformation({
  flag,
  name,
  capital,
  population,
  languages,
}) {
  return;
  `<li>
		 <p>${flag}</p>
		 <h2>${name}</h2>
		 <p>Capital: ${capital}</p>
		 <p>Population: ${population}</p>
		 <p>Languages: ${languages}</p></li>`;
}
