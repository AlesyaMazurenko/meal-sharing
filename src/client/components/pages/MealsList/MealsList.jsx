import React from 'react';
import useSwr from 'swr';
import MealItem from './MealItem';
import { AppBar } from '../../Appbar/Appbar';

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
  console.log('data', data);
  return (
    <div>
      <AppBar/>
      <h1>Meal list</h1>
      {data.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </div>
  );
}
   
export default MealsList;