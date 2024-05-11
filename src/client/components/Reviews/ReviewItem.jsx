import React from "react";
import { nanoid } from "nanoid";

export default function ReviewItem({ data }) {
    console.log(data);
    return data.map(({ title, description,stars }) => {
      return (
        <li className="reviews-item" key={nanoid()}>
              <h4>{title}</h4>
              <p>Rating {stars}/10</p>
              <p>{description}</p>
        </li>
      );
    });
}