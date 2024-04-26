import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Layout } from "./components/Layout/Layout.jsx";
import TestComponent from "./components/TestComponent/TestComponent.js";
import MealsList from "./components/pages/MealsList/MealsList.jsx";


function App() {
  return (
    <Router>
      <Route exact path="/">
        <Layout/>
        {/* <p>main</p> */}
        {/* <Meals List /> */}
      </Route>
      <Route exact path="/meals">
        <p>test</p>
        <MealsList />
      </Route>
      <Route exact path="/lol">
        <p>lol</p>
      </Route>
      <Route exact path="/test-component">
        <TestComponent></TestComponent>
      </Route>
    </Router>
  );
}

export default App;
