import React, { useState, useEffect } from "react";
// eslint-disable-next-line
import DailyWeather from "./DailyWeather";

export default function Forecasts() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [vals, setVals] = useState([]);

  useEffect(() => {
    const handlePosition = (position) => {
      const latt = position.coords.latitude;
      const long = position.coords.longitude;
      console.log(`http://localhost:7331/?latt=${latt}&long=${long}`);
      if (!isLoaded) {
        fetch(`http://localhost:7331/?latt=${latt}&long=${long}`)
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
          5 Days Weather Forecasts
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
          5 Days Weather Forecasts
        </h1>
        {/* Content */}
        <div className="bg-transparent mx-auto flex flex-row items-center w-full justify-around">
          {vals.map((item, index) => {
            return (
              <DailyWeather
                key={index}
                maxTemp={item.max_temp.toFixed(1)}
                minTemp={item.min_temp.toFixed(1)}
                svg={item.weather_state_abbr}
                date={item.applicable_date}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
