import React from "react";
import Forecasts from "./components/Forecasts";
import DailyForecast from "./components/DailyForecast";
import background from "./assets/images/background.JPG";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => (
  <div
    style={{ backgroundImage: `url(${background})`, opacity: 0.75 }}
    className="bg-fixed bg-cover bg-center flex h-screen justify-center flex-col items-center bg-opacity-75"
  >
    <div className="text-center font-sans  container bg-gray-200 py-2 rounded-lg shadow-2xl shadow-inner">
      <Router>
        <Switch>
          <Route exact path="/">
            <Forecasts />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/:year/:month/:date">
            <DailyForecast />
          </Route>
        </Switch>
      </Router>
    </div>
  </div>
);

export default App;
