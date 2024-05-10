import React from "react";
import './footes.css';
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="footer">
      <div className="SocialIcons">
        <a href="" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
        <a href="" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
      </div>
      <div className="information">
        <p>
          <span>Address</span> : Søren Friechya Vej 40B, 8230 Aarhus
        </p>
        <p>
          <span>Tel</span> : 55 55 55 55
        </p>
      </div>
    </div>
  );
}

