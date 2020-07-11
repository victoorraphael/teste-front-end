const data = {
  continents: []
}
axios.get('http://v2d77.mocklab.io/countries', {})
    .then(response => {
      const dataContinents = response.data.continents;
      dataContinents.forEach((e) => {
        data.continents.push(e);
      });
      showContinents(dataContinents);
      return data;
    })
    .catch(error => {
      console.log(error)
    })


function showContinents(continent){
  const select = document.getElementById("continents");
  const createOption = cont => {
    const option = document.createElement("option");
    option.text = cont.name;
    option.setAttribute("value", cont.name);
    select.appendChild(option);
  };
  continent.map(createOption);
};


function showCountries(){
  const countriesSelect = document.getElementById("countries");
  const continentName = document.getElementById("continents").value;
  
  const card = document.querySelector(".card");
  card.style.display = 'block';

  if (countriesSelect.length > 0){
    for(i = countriesSelect.length - 1; i>=0; i--){
      countriesSelect.remove(i);
    }
  };

  for(var i = 0; i < data.continents.length; i++){
    if (continentName === data.continents[i].name){
      const selected = data.continents[i].countries;
      const createOption = cont => {
        const option = document.createElement("option");
        option.text = cont;
        option.setAttribute("value", cont);
        countriesSelect.appendChild(option);
      };
      selected.map(createOption);      
    }
  };

  getDetails();
}


function getDetails(){
  const countriesSelect = document.getElementById("countries").value;
  axios.get(`https://restcountries.eu/rest/v2/name/${countriesSelect}`, {})
      .then(response => {
        const capital = response.data[0].capital;
        const flag = response.data[0].flag;
        const population = response.data[0].population;
        showDetails(capital, flag, population);
      })
      .catch(error => console.log(error))
  
  showDetails();
}

function showDetails(capital, flag, population){
  const countriesSelect = document.getElementById("countries").value;
  const flagCountry = document.getElementById("flag-country");
  const countryName = document.querySelector("p.title");
  const capitalCountry = document.querySelector("p.subtitle");
  const populationCountry = document.querySelector("div.content");
  
  flagCountry.setAttribute("src", flag);
  countryName.innerHTML = 'País: ' + countriesSelect;
  capitalCountry.innerHTML = 'Capital: ' + capital;
  populationCountry.innerHTML = 'População: ' + population + ' hab';
}

  