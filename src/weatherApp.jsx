import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const apiKey = "22f797bff3c7d52d929ae18e536feaf1";

  const fetchWeather = async () => {
    if (!city) return;

    try {
      setError('');
      setWeather(null);

      const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: city,
          appid: apiKey,
          units: 'metric',
        },
      });

      setWeather(response.data);
    } catch (err) {
      setWeather(null);
      if (err.response?.status === 404) {
        setError('City not found.');
      } else if (err.response?.status === 401) {
        setError('Invalid API key.');
      } else {
        setError('Something went wrong.');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-blue-500 to-blue-300 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl">
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-900">
          Weather Now ☀️
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>

        {error && (
          <p className="text-red-600 mt-6 text-center font-medium">{error}</p>
        )}

        {weather && (
          <div className="mt-8 bg-blue-100 rounded-xl p-6 text-blue-900 text-center shadow">
            <h2 className="text-2xl font-bold mb-2">
              {weather.name}, {weather.sys.country}
            </h2>
            <div className="flex justify-center items-center gap-4 mt-4">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather icon"
                className="w-20 h-20"
              />
              <div className="text-left">
                <p className="text-4xl font-extrabold">{weather.main.temp}°C</p>
                <p className="capitalize text-lg">{weather.weather[0].description}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-around text-sm text-blue-800">
              <div>
                <p className="font-semibold">Humidity</p>
                <p>{weather.main.humidity}%</p>
              </div>
              <div>
                <p className="font-semibold">Wind</p>
                <p>{weather.wind.speed} m/s</p>
              </div>
              <div>
                <p className="font-semibold">Feels Like</p>
                <p>{weather.main.feels_like}°C</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
