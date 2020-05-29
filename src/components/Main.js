/* eslint-disable no-sequences */
import React, {useState} from "react";
import Header from "./Header";
import axios from "axios";
import Content from "./Content";
import WeatherSearch from "./WeatherSearch";
import WeatherData from "./WeatherData";
import Context from "../Context"
import Error from "./Error"
import DateTime from "./DateTime";
import Tagline from './Tagline'

const API_KEY = "9ce2dac72a40f15e71c6bcfae7e63d23";

const Main = () => {
    const [weather, setWeather] = useState()
    const [city, setCity] = useState()
    const [error, setError] = useState()
    const api_call = async e => {
    e.preventDefault()  
    const city = e.target.elements.city.value
    if(!city) {
        return setError("Please enter name of the city"), setWeather(null)
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    const request = axios.get(url);
    const response = await request;
    setWeather(response.data.main);
    setCity(response.data.name)
    setError(null)

  };

  return (
    <div className="main">
      <Header />
      <Content>
        <DateTime/>
        <Tagline/>
        <Context.Provider value={{api_call: api_call, weather: weather, city: city}}>
        <WeatherSearch></WeatherSearch>
        {weather && <WeatherData/>}
        {error && <Error error={error}/>}
        </Context.Provider>
      </Content>
    </div>
  );
};

export default Main;
