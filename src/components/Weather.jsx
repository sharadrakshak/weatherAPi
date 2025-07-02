import React, { useEffect, useRef, useState } from "react";
import search_icon from "../assets/search.png";
export default function Weather() {
  const [weatherData, setWeatherData] = useState("");
  const [query, setQuery] = useState("");
  const inputData = useRef();

  const images = import.meta.glob("../assets/*.{png,jpg,jpeg,svg}", {
    eager: true,
    import: "default",
  });
  let a = Object.keys(images);

  const search = async (data) => {
    if (data === "") {
      alert("Enter City Name");

      return;
    }
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=0eab41f668c84456b3f140537251504&q=${data}&aqi=no`
      );
      const cityData = await response.json();
      if (!response.ok) {
        alert("Enter Valid City Name");
        return;
      }

      setWeatherData({
        humidity: cityData.current.humidity,
        windSpeed: cityData.current.wind_kph,
        temperature: cityData.current.temp_c,
        cityName: cityData.location.name,
        icon: cityData.current.condition.icon,
      });
    } catch {}
  };

  useEffect(() => {
    search("jaipur");
  }, []);

  return (
    <div className="Weather w-[400px] max650:w-full max650:max-w-[320px] p-10 max650:p-6 bg-purple-700 relative rounded-lg bg-[linear-gradient(45deg,#2f4680,#500ae4)]">
      <div className="searchbar flex justify-center items-center gap-4 max650:flex-col">
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          className="border-none rounded-full outline-none bg-[#ebfffc] pl-6 text-[#272727] h-12 text-[17px] max650:w-[260px] "
          ref={inputData}
        />
        <img
          onClick={() => {
            search(inputData.current.value);
            setQuery("");
          }}
          src={search_icon}
          alt=""
          className="w-[50px] p-4 rounded-[100%] bg-[#ebfffc] cursor-pointer"
        />
      </div>
      <div className="weather_details flex flex-col justify-center items-center">
        {a[0] && (
          <img
            src={weatherData == "" ? images[a[0]] : weatherData.icon}
            alt="Weather Icon"
            className="w-[150px] my-4"
          />
        )}
        <p className="text-white text-[70px] max650:text-[48px]">
          {weatherData == "" ? 16 : weatherData.temperature}&deg;C
        </p>
        <p className="text-white text-[30px] max650:text-[22px]">
          {weatherData == "" ? "London" : weatherData.cityName}
        </p>
      </div>
      <div className="weather_data flex justify-between items-center gap-5 mt-4 max650:flex-col">
        <div className="col flex  gap-3 ">
          {a[3] && (
            <img className="m-2" width={"26px"} src={images[a[3]]} alt="" />
          )}

          <div>
            <p className="text-white">{weatherData.humidity} %</p>
            <span className="text-white">Humidity</span>
          </div>
        </div>
        <div className="col flex   gap-3  ">
          {a[8] && (
            <img className="m-2" width={"26px"} src={images[a[8]]} alt="" />
          )}

          <div>
            <p className="text-white">{weatherData.windSpeed} km/h</p>
            <span className="text-white ">Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
