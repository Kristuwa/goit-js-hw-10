import Notiflix from 'notiflix';

export default function fetchCountries(name) {
  return fetch(
    //  `https://restcountries.eu/rest/v2/all?fields=${name};capital;flag;population;languages`
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,flags,population,languages,
	 `
  ).then(response => {
    if (!response.ok) {
      Notiflix.Notify.failure('"Oops, there is no country with that name"');
      throw new Error(response.status);
    }
    return response.json();
  });
}
