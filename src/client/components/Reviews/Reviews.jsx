import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useSWR from 'swr';
import ReviewItem from "./ReviewItem";


// import { getReviewsOfMovie } from "api/Api";
// import RewievItem from "./ReviewItem";

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

  // const clickHandler = (event) => {
  //   event.preventDefault();

  //   const starValue = Number(event.target.value);
  //   setRating(starValue);

  //   const create_date = new Date().toISOString();
  // }

  // const reviewData = JSON.stringify({
  //     ...newReview,
  //   stars: currentRating,
  //   meal_id: Number(mealId),
  //   created_date: created_date,
  // });
  // fetch("http://localhost:5001/api/reviews", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: reviewData,
  // })
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     return response.json();
  //   })
  //   .then((data) => {
  //     console.log("Reservation successful:", data);
  //     setNewReview({
  //       meal_id: "",
  //       stars: "",
  //       create_date: "",
  //     });
  //   })
  //   .catch((error) => {
  //     console.error("Error submitting reservation:", error);
  //   });

  const [mealReviews, setMealReview] = useState([]);

  let errorMessage = false;

  const { data, error, isLoading } = useSWR(
    `http://localhost:5001/api/reviews/${id}`,
    fetcher
  );

  // setMealReview(data);
  // console.log(mealReviews);
  console.log("data", {data}.data);
  // if ({data}.data === 0) return (error = true);
  return (
    <>
      <h3>Our reviews:</h3>
      {error && <p>Loading</p>}
      {{ data }.data === 0 && <p>We have not review yet</p>}
      {{ data }.data && (
        <>
          <ReviewItem data={{ data }.data.review} />
        </>
      )}
    </>

    // <p>Rewiev {review}</p>

    // <ul className="reviews-list">
    //   {review.review && <RewievItem data={movieReviews.results} />}
    //   {error && <p>Reviews not found</p>}
    //   {review.review.length === 0 && <p>Reviews not found</p>}
    // </ul>

    //      <div className="meal-star">
    //     {[...Array(5)].map((_, index) => {
    //       const starValue = index + 1;
    //       return (
    //         <label key={index}>
    //           <input
    //             type="radio"
    //             name="rating"
    //             value={starValue}
    //             onClick={clickHandler}
    //             className="input-star"
    //           />
    //           <FaStar
    //             className="star"
    //             size={20}
    //             color={starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
    //             onMouseEnter={() => setHover(starValue)}
    //             onMouseLeave={() => setHover(null)}
    //           />
    //         </label>
    //       );
    //     })}
    //     <p>
    //       Rating : <span className="rating">{rating}</span>
    //     </p>
    //   </div>
    // );
    // <ul className="reviews-list">
    //   {movieReviews.results && <RewievItem data={movieReviews.results} />}
    //   {errorMessage && <p>Reviews not found</p>}
    // </ul>
  );
}

export default Reviews;