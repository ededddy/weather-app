import React from "react";
import weather from "../assets/svg/commons";
import { Link } from "react-router-dom";

export default function DailyWeather(props) {
  const { minTemp, maxTemp, svg } = props;
  let { date } = props;
  date = date.replace(/-/g, "/");
  function getWeatherSVG() {
    return weather[svg];
  }
  return (
    <Link to={`/${date}`}>
      <div className="rounded-lg  bg-white mb-2 mt-4 px-3 py-2 flex flex-col mx-5">
        <div className="mx-auto w-32 h-32">{getWeatherSVG()}</div>
        <div className="flex flex-col font-semibold items-center justify-between ">
          <div className="mx-2 px-2 text-3xl my-1 py-1 text-gray-600">
            {date.slice(-4).replace("-", "/")}
          </div>
          <div className="text-xl mx-2 px-2 my-1 py-1 text-gray-600 hover:text-gray-900">
            Min: {minTemp} °C
          </div>
          <div className="text-xl mx-2 px-2 my-1 py-1 text-gray-600 hover:text-gray-900">
            Max: {maxTemp} °C
          </div>
        </div>
      </div>
    </Link>
  );
}
