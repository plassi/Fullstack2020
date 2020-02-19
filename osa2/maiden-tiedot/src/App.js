import React, { useState, useEffect } from 'react'
import axios from 'axios'

const FindCountries = (props) => {

  return (
    <div>
      find countries <input
        onChange={props.handleFindChange}
      />
    </div>
  )
}

const Countries = ({ countries, setShowCountries }) => {

  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  else if (countries.length > 1) {

    return (
      <div>
        {countries.map(country => {
          return (
            <div key={country.name}>
              {country.name} <CountryButton country={country} setShowCountries={setShowCountries} />
            </div>
          )
        })}
      </div>

    )
  }
  else if (countries.length === 1) {
    return (
      <div>
        <Country country={countries} />
      </div>
    )
  }
  else {
    return (
      <div>
      </div>
    )
  }

}

const CountryButton = ({ country, setShowCountries }) => {

  return (
    <button onClick={() => setShowCountries([country])}>show</button>
  )
}

const Country = ({ country }) => {
  const count = country[0]

  return (
    <div>
      <div>
        <h2>{count.name}</h2>
      </div>
      <div>
        capital {count.capital}
      </div>
      <div>
        population {count.population}
      </div>
      <div>
        <h3>languages</h3>
      </div>
      <div>
        <ul>
          {count.languages.map((language) => {

            return (

              <li key={language.name}>{language.name}</li>
            )
          })}
        </ul>
      </div>
      <div>
        <img alt={count} src={count.flag} width="100px" />
      </div>
      <Weather country={count}/>
    </div>

  )

}

const Weather = ({country}) => {
  const [weather, setWeather] = useState([])

  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      .then(response => {
        setWeather(response.data)
      })

  }, [])



  console.log(weather);
  while (weather.length === 0) {
    return (
      <>
        
      </>
    )
  }
    return (
      <div>
        <h3>Weather in {weather.location.name}</h3>
        
        <b>temperature:</b> {weather.current.temperature} Celsius<br />
        
        <img alt={weather.current.weather_descriptions[0]} src={weather.current.weather_icons[0]}></img> <br />
        <b>wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}
        
      </div>
    )
  
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [showCountries, setShowCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
        setShowCountries(response.data)
      })


  }, [])

  const handleFindChange = (event) => {
    setShowCountries(countries.filter((element) =>
      element.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  return (
    <div style={{ margin: 5 }}>
      <FindCountries countries={countries} handleFindChange={handleFindChange} />
      <Countries countries={showCountries} setShowCountries={setShowCountries} />
    </div>
  );
}

export default App;
