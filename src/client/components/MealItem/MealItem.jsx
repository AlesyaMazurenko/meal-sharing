import React from "react";
import { Link } from "react-router-dom";
import './MealItem.css';

function MealItem({ meal }) {
    return (
      <div className="meal_card">
        <Link to={`/meals/${meal.id}`}>
          <h3>{meal.title}</h3>
          <img src={meal.img} className="card_img" alt={meal.title} width="460px"></img>
          <p>{meal.description}</p>
          <p className="price">Price: {meal.price} kr.</p>
        </Link>
      </div>
    );
}

export default MealItem;