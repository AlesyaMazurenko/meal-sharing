import React from 'react';
import useSwr from 'swr';
import MealItem from '../../MealItem/MealItem';
import './Meals.css';

const fetcher = (url) => {
    return fetch(url).then((res) => res.json());
};

function MealsList() {
     const { data, error, isLoading } = useSwr(
       "http://localhost:5001/api/meals",
       fetcher
  ); 
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error in fetching data</div>;
 
  return (
    <div>
      <h1>Meal list</h1>
      <div className="cards_wrapper">
        {data.map((meal) => (
          <MealItem key={meal.id} meal={meal} />
        ))}
      </div>
    </div>
  );
}
   
export default MealsList;