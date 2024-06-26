import React from "react";
import { NavLink } from "react-router-dom";
import './Appbar.css';

const getClassName = ({ isActive }) => {
  return isActive ? `nav-item active` : `nav-item`;
};

export const AppBar = () => {
  return (
    <div className="appbar">
      <nav>
        <NavLink className={getClassName} to="/">
          Home
        </NavLink>
        <NavLink className={getClassName} to="/meals">
          Meals
        </NavLink>
        <NavLink className={getClassName} to="/reservations">
          Reservations
        </NavLink>
      </nav>
    </div>
  );
};