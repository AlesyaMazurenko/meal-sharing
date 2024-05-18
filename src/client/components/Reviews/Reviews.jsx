import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useSWR from 'swr';
import ReviewItem from "./ReviewItem";
import ReviewForm from "./ReviewForm/ReviewForm";

const fetcher = (url) => {
  return fetch(url).then((res) => res.json());
};

function Reviews() {
  const { id } = useParams();

  //   const [rating, setRating] = useState(null);
  //   const [hover, setHover] = useState(null);
  //   let errorMessage = false;
  const currentRating = 0;

  const [newReview, setNewReview] = useState({
    meal_id: "",
    created_date: "",
    title: "",
    description: "",
    stars: "",
  });

  const [mealReviews, setMealReview] = useState([]);

  let errorMessage = false;

  const { data, error, isLoading } = useSWR(
    `http://localhost:5001/api/reviews/${id}`,
    fetcher
  );

  // console.log("data", {data}.data);

  return (
    <>
      <h3>Our reviews:</h3>
      {error && <p>Reviews not found</p>}
      {{ data }.data === 0 && <p>We have not review yet</p>}
      {{ data }.data && (
        <>
          <ReviewItem data={{ data }.data.review} />
        </>
      )}
      <ReviewForm />
    </>
  );
}

export default Reviews;