import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Layout } from "./components/Layout/Layout.jsx";
import TestComponent from "./components/TestComponent/TestComponent.js";
import MealsList from "./components/pages/MealsList/MealsList.jsx";
import NotFoundPage from "./components/pages/NotFoundPage/NotFound.jsx";
import HomePage from "./components/pages/HomePage/HomePage.jsx";

function App() {
  return (
    <Router>
      <Route exact path="/">
        <HomePage />
        {/* <p>main</p> */}
        {/* <Meals List /> */}
      </Route>
      <Route exact path="/meals">
        <MealsList />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
      {/* <Route exact path="/lol">
        <p>lol</p>
      </Route>
      <Route exact path="/test-component">
        <TestComponent></TestComponent>
      </Route> */}
    </Router>
  );
}

export default App;
