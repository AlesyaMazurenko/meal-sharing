import React from "react";
import {
  BrowserRouter, Routes, Route, Switch} from "react-router-dom";

import { Layout } from "./components/Layout/Layout.jsx";
import TestComponent from "./components/TestComponent/TestComponent.js";
import MealsList from "./components/pages/MealsList/MealsList.jsx";
import HomePage from "./components/pages/HomePage/HomePage.jsx";
import NotFoundPage from "./components/pages/NotFoundPage/NotFound.jsx";
import MealInfo from "./components/MealInfo/MealInfo.jsx";
import Reviews from "./components/Reviews/Reviews.jsx";
import Header from "./components/Header/Header.jsx";
import { AppBar } from "./components/Appbar/Appbar.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {
  return (
    <div>
      <AppBar />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route exact path="/meals">
          <MealsList />
        </Route>

        <Route exact path="/meals/:id">
          <MealInfo />
          {/* <Route  path="reviews">
            <Reviews />
          </Route> */}
          {/* <Route path="reservation">
            <Reservation/>
          </Route> */}
        </Route>

        {/* <Route path="reservation" element={<Reservation />} /> */}
        <Route path="*" element={<NotFoundPage />} />
        {/* <Route exact path="/lol">
        <p>lol</p>
      </Route>
      <Route exact path="/test-component">
        <TestComponent></TestComponent>
      </Route> */}
      </Switch>
      <Footer />
    </div>
  );
}

export default App;


//  <Routes>
//           <Route exact path="/">
//             <HomePage />
//           </Route>
//           <Route exact path="/meals">
//             <MealsList />
//           </Route>
//           <Route path="/meals/:id">
//             <MealInfo />
//             <Route path="/reviews">
//               <Reviews />
//             </Route>