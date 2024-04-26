import React from "react";
function MealItem({ meal }) {
    return (
        <div className="meal_card">
            <h3>{meal.title}</h3>
            <p>{meal.description}</p>
            <p>Price: {meal.price} kr.</p>
        </div>
    )
}

export default MealItem;