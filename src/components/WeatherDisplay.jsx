import React, { useState } from 'react';
import SearchForm from './SearchForm';

const WeatherDisplay = () => {
  const [temperature, setTemperature] = useState(null);
  const [city, setCity] = useState('');
  const [units, setUnits] = useState(null);
  const [isRaining, setIsRaining] = useState(false);
  const [humidity, setHumidity] = useState(null)
  const [description, setDescription] = useState(null)
  const [weather, setWeather] = useState(null)

  const handleWeatherData = (temperature, city, isRaining, units, humidity, description ,weather) => {
    setTemperature(temperature);
    setCity(city);
    setIsRaining(isRaining);
    setUnits(units);
    setHumidity(humidity)
    setDescription(description)
    setWeather(weather)
  };

    let emoji
    if(units == "metric"){
        if (isRaining) {
            emoji = '🌧'; 
        } else if (temperature >= 16 && temperature <= 21) {
            emoji = '🌤️'; 
        } else if (temperature >= 22) {
            emoji = '☀️';
        } else {
            emoji = '☁️';
        }
    }else{
        if (isRaining) {
            emoji = '🌧'; 
        } else if (temperature >= 70 && temperature <= 90) {
            emoji = '🌤️'; 
        } else if (temperature >= 91) {
            emoji = '☀️';
        } else {
            emoji = '☁️';
        }
    }

    return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Météo</h1>
      <SearchForm onWeatherData={handleWeatherData} />
        {temperature !== null && (
            <p className="text-xl mt-4">
            La température à {city} est de {temperature}°{units === 'metric' ? 'C' : 'F'} {emoji}.
            </p>
        )}
        {humidity !== null && (
            <p>Humidité : {humidity}</p>
        )}
        {description !== null && (
            <p>Description du temps : {description}</p>
        )}
        {weather !== null && (
            <p>Temps : {weather}</p>
        )}
       
    </div>
  );
};

export default WeatherDisplay;
