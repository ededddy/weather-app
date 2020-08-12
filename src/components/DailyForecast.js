import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import weather from "../assets/svg/commons";

export default function DailyForecast() {
  const { year, month, date } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [vals, setVals] = useState([]);

  function getWeatherSVG(svg) {
    return weather[svg];
  }

  useEffect(() => {
    const handlePosition = (position) => {
      const latt = position.coords.latitude;
      const long = position.coords.longitude;
      if (!isLoaded) {
        console.log(
          `http://localhost:3001/day/${`${year}/${month}/${date}`}?latt=${latt}&long=${long}`
        );
        fetch(
          `http://localhost:3001/day/${`${year}/${month}/${date}`}?latt=${latt}&long=${long}`
        )
          .then((res) => res.json())
          .then((result) => {
            setVals(result);
            setIsLoaded(true);
          });
      }
    };
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(handlePosition);
    // eslint-disable-next-line
  }, [isLoaded]);

  if (!isLoaded) {
    return (
      <div className="pt-1 mb-12 mt-1">
        {/* Title */}
        <h1 className="text-4xl text-blue-700 leading-tight font-semibold">
          {`${year}/${month}/${date} Forecast`}
        </h1>
        <div className="text-3xl text-gray-600 bg-transparent mx-auto flex flex-row items-center w-full justify-around">
          Loading ...
        </div>
      </div>
    );
  } else {
    return (
      <div className="pt-1 mb-12 mt-1">
        {/* Title */}
        <h1 className="text-4xl text-blue-700 leading-tight font-semibold">
          {`${year}/${month}/${date} Forecast`}
        </h1>
        <div className="text-3xl text-gray-600 bg-transparent mx-auto flex flex-row items-center w-full justify-around">
          <div className="w-2/12 ml-4 mr-20">
            <div className="mx-auto w-64 h-64">
              {getWeatherSVG(vals[0].weather_state_abbr)}
            </div>
          </div>
          <div className="text-left w-10/12 flex flex-col justify-around font-semibold">
            <h1 className="text-2xl my-3">
              Humidity :
              <span className="px-3 text-blue-700 ">
                {vals[0].humidity}
                <span className="px-2 text-gray-600">%</span>
              </span>
            </h1>
            <h1 className="text-2xl my-3">
              Air Pressure :
              <span className="px-3 ">
                {vals[0].air_pressure.toFixed(1)}
                <span className="px-2">mb</span>
              </span>
            </h1>
            <h1 className="text-2xl my-3">
              Maximum Temperature :
              <span className="px-3 ">
                {vals[0].max_temp.toFixed(1)}
                <span className="px-2">°C</span>
              </span>
            </h1>
            <h1 className="text-2xl my-3">
              Minimum Temperature :
              <span className="px-3 ">
                {vals[0].min_temp.toFixed(1)}
                <span className="px-2">°C</span>
              </span>
            </h1>
            <h1 className="text-2xl my-3">
              Wind Speed :
              <span className="px-3 ">
                {vals[0].wind_speed.toFixed(0)}
                <span className="px-2">mph</span>
              </span>
            </h1>
            <h1 className="text-2xl my-3">
              Visibility :
              <span className="px-3 ">
                {vals[0].visibility.toFixed(1)}{" "}
                <span className="px-2">miles</span>
              </span>
            </h1>
            <h1 className="text-2xl my-3">
              Wind Direction :
              <span className="px-3 ">{vals[0].wind_direction_compass}</span>
            </h1>
          </div>
        </div>
      </div>
    );
  }
}
