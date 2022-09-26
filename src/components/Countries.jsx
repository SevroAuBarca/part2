import React, { useEffect, useState } from "react";
import axios from "axios";

export const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  let auxCountries = [];
  const apiCountries = process.env.REACT_APP_URL_COUNTRIES;
  useEffect(() => {
    console.log("effect");
    axios.get(apiCountries).then((response) => {
      console.log("promise fulfilled");
      const data = response.data.map((data) => ({
        name: data.name.common,
        capital: data.capital,
        languages: data.languages,
        population: data.population,
        flag: data.flags.svg,
        isShow: false,
      }));
      setCountries(data);
    });
  }, [apiCountries]);

  if (!searchValue.length >= 1) {
    auxCountries = countries;
  } else {
    auxCountries = countries.filter(({ name }) =>
      name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
  console.log(countries);

  const handleChange = (evennt) => {
    setSearchValue(evennt.target.value);
  };

  const handleClick = (text) => {
    const countryIndex = countries.findIndex(
      (countrie) => countrie.name === text
    );
    const newCountries = [...countries];

    if (newCountries[countryIndex].isShow) {
      newCountries[countryIndex].isShow = false;
    } else {
      newCountries[countryIndex].isShow = true;
    }
    setCountries(newCountries);
  };
  return (
    <section>
      <input value={searchValue} onChange={handleChange} placeholder="search" />
      {searchValue === "" ? (
        <p>Search a country</p>
      ) : auxCountries.length > 10 ? (
        <p>Too many matches, speciffy another filter</p>
      ) : auxCountries.length === 1 ? (
        <article>
          {auxCountries.map(
            ({ name, capital, languages, population, flag }) => {
              return (
                <ul>
                  <li>{name}</li>
                  <li>{capital}</li>
                  <li>{Object.values(languages)}</li>
                  <li>{population}</li>
                  <img src={flag} alt="country flag"></img>
                </ul>
              );
            }
          )}
        </article>
      ) : (
        auxCountries.map((countries) => (
          <div>
            <p key={countries.name}>{countries.name}</p>
            <button onClick={() => handleClick(countries.name)}>
              {!countries.isShow ? "show" : "hide"}{" "}
            </button>
            {countries.isShow && (
              <ul>
                <li>{countries.name}</li>
                <li>{countries.capital}</li>
                <li>{Object.values(countries.languages)}</li>
                <li>{countries.population}</li>
                <img src={countries.flag} alt="country flag"></img>
              </ul>
            )}
          </div>
        ))
      )}
    </section>
  );
};
