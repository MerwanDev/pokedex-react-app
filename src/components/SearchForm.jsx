import React, { useState, useEffect } from 'react';

const MeteoDetails = ({onWeatherData}) => {
  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState(null);
  const [loading, setLoading] = useState(false);
  const [units, setUnits] = useState(null)
  const [isRaining, setIsRaining] = useState(false)
  const [humidity, setHumidity] = useState(null)
  const [description, setDescription] = useState(null)
  const [weather, setWeather] = useState(null)

  const getAPIdata = async (city) => {
    const APIkey = "af413077c792e0705064e0298ab70d9e"
    try {
        const tempDescriptionArr = []
        setLoading(true)
        setIsRaining(false)
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APIkey}&units=${units}`)
        .then((response) => response.json())
        .then((data) => {
          setTemperature(data.main.temp)
          setHumidity(data.main.humidity)
          setDescription(data.weather[0].description)
          setWeather(data.weather[0].main)
          if(data.weather[0].main.toLowerCase() == "rain"){
            setIsRaining(true)
          }
        })
        .catch((error) => {
            console.error("Une erreur s'est produite :", error)
        })
        setLoading(false)
    } catch (error) {
      console.error('Une erreur s\'est produite :', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getAPIdata(city);
  };

  useEffect(() => {
    getAPIdata();
  }, []);

  onWeatherData(temperature, city, isRaining, units , humidity ,description , weather);

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          placeholder="Ville"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border border-gray-300 rounded-l px-4 py-3 focus:outline-none"
        />
        <select
          id="metric"
          value={units}
          onChange={(e) => setUnits(e.target.value)}
          className="border border-gray-300 rounded-r px-4 py-3 focus:outline-none"
        >
          <option value="">Unitée</option>
          <option value="metric">°C</option>
          <option value="imperial">°F</option>
        </select>
        <button
          type="submit"
          disabled={loading || city.trim() === ''}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-r px-4 py-2 ml-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Chargement...' : 'Rechercher'}
        </button>
      </form>
    </div>
  );
};

export default MeteoDetails;
