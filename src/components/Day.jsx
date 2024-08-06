
const Day = ({ date, temMin, temMax, weatherCode, isToday }) => {
  
  function formatDay(dateStr) {
    return new Intl.DateTimeFormat("en", {
      weekday: "short",
    }).format(new Date(dateStr));
  }

  function getWeatherIcon(wmoCode) {
    const icons = new Map([
      [[0], "☀️"],
      [[1], "🌤"],
      [[2], "⛅️"],
      [[3], "☁️"],
      [[45, 48], "🌫"],
      [[51, 56, 61, 66, 80], "🌦"],
      [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
      [[71, 73, 75, 77, 85, 86], "🌨"],
      [[95], "🌩"],
      [[96, 99], "⛈"],
    ]);
    const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
    if (!arr) return "❓"; // Default icon for unknown weather codes
    return icons.get(arr);
  }

  return (
    <div className="day">
      <span>{getWeatherIcon(weatherCode)}</span>
      <p>{isToday ? "Today" : formatDay(date)}</p>
      <p>{Math.round(temMin)}° - <strong>{Math.round(temMax)}°</strong></p>
    </div>
  );
}

export default Day;
