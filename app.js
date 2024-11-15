const searchParams = new URLSearchParams(location.search).get("name");

const flagImage = document.querySelector(".country-details img");
const heading = document.querySelector(".country-details h1");
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population ");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");
const domian = document.querySelector(".domian");
const currencies = document.querySelector(".currencies");
const languages = document.querySelector(".languages");
const borderCountries = document.querySelector(".border-countries");

fetch(`https://restcountries.com/v3.1/name/${searchParams}?fullText=true`)
  .then((res) => res.json())
  .then(([data]) => {
    flagImage.src = data.flags.svg;
    heading.innerText = data.name.common;
    if (data.name.nativeName) {
      nativeName.innerText = Object.values(data.name.nativeName)[0].common;
    } else {
      nativeName.innerText = data.name.common;
    }
    population.innerText = data.population.toLocaleString("en-IN");
    region.innerText = data.region;
    if (data.subRegion) {
      subRegion.innerText = data.subregion;
    }
    if (data.capital) {
      capital.innerText = data.capital;
    }

    domian.innerText = data.tld.join(", ");

    if (data.currencies) {
      currencies.innerText = Object.values(data.currencies)
        .map((currency) => currency.name)
        .join(", ");
    }
    if (data.languages) {
      languages.innerText = Object.values(data.languages).join(", ");
    }

    if (data.borders) {
      data.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            const borderCountriesTag = document.createElement("a");
            borderCountriesTag.innerText = borderCountry.name.common;
            borderCountriesTag.href = `country.html?name=${borderCountry.name.common}`;
            borderCountries.append(borderCountriesTag);
          });
      });
    }
  });
