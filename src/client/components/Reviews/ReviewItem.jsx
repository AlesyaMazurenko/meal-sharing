import React from "react";
import { nanoid } from "nanoid";
import './ReviewItem.css';

export default function ReviewItem({ data }) {
    console.log(data);
    return data.map(({ title, description, stars }) => {
      return (
        <li className="reviews-item" key={nanoid()}>
          <span className="line"></span>
          <h4>{title}</h4>
          <p>Rating {stars}/5</p>
          <span
            className="fa fa-star"
            style={{ color: Number(stars) >= 1 ? "orange" : "grey" }}
          ></span>
          <span
            className="fa fa-star"
            style={{ color: Number(stars) >= 2 ? "orange" : "grey" }}
          ></span>
          <span
            className="fa fa-star"
            style={{ color: Number(stars) >= 3 ? "orange" : "grey" }}
          ></span>
          <span
            className="fa fa-star"
            style={{ color: Number(stars) >= 4 ? "orange" : "grey" }}
          ></span>
          <span
            className="fa fa-star"
            style={{ color: Number(stars) >= 5 ? "orange" : "grey" }}
          ></span>
          <p>{description}</p>
        </li>
      );
    });
}