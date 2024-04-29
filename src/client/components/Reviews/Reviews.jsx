import React, { useEffect, useState } from "react";
import useSWR from 'swr';


// import { getReviewsOfMovie } from "api/Api";
import { useParams } from "react-router";
// import RewievItem from "./ReviewItem";

const fetcher = (url) => {
  return fetch(url).then((res) => res.json());
};

export default function Reviews() {
  const { id } = useParams();
  
  console.log('id', id);
  const [mealRewiev, setMealRewiev] = useState([]);
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    let errorMessage = false;
    const currentRating = 0;
    
    const [newReview, setNewReview] = useState({
      meal_id: "",
      created_date: "",
      title: "",
      description: "",
      stars:"",
    });

  const clickHandler = (event) => {
    event.preventDefault();

    const starValue = Number(event.target.value);
    setRating(starValue);

    const create_date = new Date().toISOString();
  }

  //   const reviewData = JSON.stringify({
  //       ...newReview,
  //     stars: currentRating,
  //     meal_id: Number(mealId),
  //     created_date: created_date,
  //   });
  //   fetch("http://localhost:5001/api/reviews", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: reviewData,
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("Reservation successful:", data);
  //       setNewReview({
  //         meal_id: "",
  //         stars: "",
  //         create_date: "",
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error submitting reservation:", error);
  //     });
  // };

     const { review, error, isLoading } = useSWR(
       `http://localhost:5001/api/reviews/${id}`,
       fetcher
     );
     if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error in fetching data</div>;
  // if (review.review.length === 0) return error = true;
    //  console.log("review", review);
     
  // useEffect(() => {
  //   const fetchReview = async (id) => {
  //     try {
  //       const data = await getReviewsOfMeal(id);
  //       setMealRewiev(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchReview(id);
  // }, [id]);

//   if (movieReviews.total_results === 0) {
//     errorMessage = true;
//   }

  console.log(review);
  return (
    <>
      <p>Rewiev {review}</p>

      <ul className="reviews-list">
        {review.review && <RewievItem data={movieReviews.results} />}
        {error && <p>Reviews not found</p>}
        {review.review.length === 0 && <p>Reviews not found</p>}
      </ul>
    </>
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