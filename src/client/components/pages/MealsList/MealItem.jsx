import React from "react";
function MealItem({ meal }) {
    return (
        <div className="meal_card">
            <h3>{meal.title}</h3>
            <img src={meal.img} alt={meal.title} width='460px'></img>
            <p>{meal.description}</p>
            <p>Price: {meal.price} kr.</p>
        </div>
    )
}

export default MealItem;