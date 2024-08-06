import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import Weather from './components/Weather'

const App = () => {
  const [queryLocation, setQueryLocation] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [weather, setWeather] = useState({})
  const [error, setError] = useState('')
  const [location, setLocation] = useState('');

  useEffect(function() {
    async function fetchWeather() {
      try {
        setIsLoading(true)
        if(queryLocation.length < 3) return;

        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${queryLocation}`)

        if(!geoRes.ok) throw new Error('Location not found')

        const geoData = await geoRes.json()

        const { latitude, longitude, timezone, name, country_code } = geoData.results.at(0)
        setLocation(`${name} ${country_code}`)

        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`)

        if(!weatherRes.ok) throw new Error('Weather not found')

        const weatherData = await weatherRes.json()
        setWeather(weatherData.daily)
      } catch (err) {
          setError(err.message)
      } finally {
          setIsLoading(false)
      }
    }
    fetchWeather()
  }, [queryLocation])

  const size = Object.keys(weather).length

  return (
    <div className='app'>
      <h1>classy weather</h1>
      <input 
        type="text" 
        placeholder="search from location"
        value={queryLocation}
        onChange={(e) => setQueryLocation(e.target.value)}
      />
      { isLoading && <p className='loader'>Loading...</p>}
      { !isLoading && queryLocation.length > 3 && <Weather weather={weather} location={location}/>}
      { error && <p>{error}</p>}

    </div>
  )
}

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)
root.render(<App/>)