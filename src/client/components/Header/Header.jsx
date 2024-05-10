import React from "react";
import { NavLink } from "react-router-dom";
import './Main.css';

export default function Main() {
    return (
      <div>
        <div className="container">
          <div className="div-container">
            <h1 className="header_title">
              Meal <br></br>
              <span className="header_un">the burger</span>
              <br></br>
              Sharing
            </h1>
            <NavLink className="header_link" to="/meals">
              Go to Meals
            </NavLink>
          </div>
        </div>
      </div>
    );
}
