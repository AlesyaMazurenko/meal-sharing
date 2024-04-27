import React from "react";
import './Header.css';

function Header() {
    return (
      <div>
        <div className="container">
          <div className="div-container">
            <h1 className="header_title">
            Meal<span classname='header_un'>the burger</span>Sharing
            </h1>
          </div>
        </div>
      </div>
    );
}

export default Header;