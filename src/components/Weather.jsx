import Day from './Day'


const Weather = ({ weather, location }) => {
    const {temperature_2m_max, temperature_2m_min, time, weathercode} = weather  

    const dayElements = time.map((date, i) => 
        <Day 
            key={i} 
            date={date} 
            temMin={temperature_2m_min[i]}
            temMax={temperature_2m_max[i]}
            weatherCode={weathercode[i]}
            isToday={i === 0}
        />)

    return (
        <>
            <h2>Weather {location}</h2>
            <div className="weather">
                {dayElements}
            </div>
        </>
    )
}

export default Weather;