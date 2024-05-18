import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import toast from "cogo-toast-react-17-fix";
import { FaStar } from 'react-icons/fa';
import './ReviewForm.css';

export default function ReviewForm() {
  const { id } = useParams();
  
  const [newReview, setNewReview] = useState({
    created_date: "",
    description: "",
    id: "",
    meal_id: "",
    stars: "",
    title:"",
  });
  
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

const addReview = (evt) => {
    evt.preventDefault();
    const meal_id = id;
    const created_date = new Date().toISOString().split("T")[0];
   
    const formData = JSON.stringify({
        ...newReview,
        stars: rating,
      id: Number(meal_id + parseInt(created_date) + Math.random(100000)),
      meal_id: Number(meal_id),
      created_date: created_date,
    });

    fetch("http://localhost:5001/api/reviews", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })

      .then((data) => {
        console.log("Review added:", data);
        setNewReview({
          title: "",
          description: "",
          stars: "",
        });
        setRating(null);
    

        toast.success("Thanks for your review!", {
          position: "bottom-center",
          heading: "Success!",
          hideAfter: 5, // hides the toast after 5 seconds
        });
      })
      .catch((error) => {
        toast.error("Error submitting review", {
          position: "top-center",
          heading: "Error",
          hideAfter: 5,
        });
      }); 
      };
    
    return (
      <>
        <div>
          <h3>Have you tried? Leave your review!</h3>
          <form className="rewiew-form" onSubmit={addReview}>
            <div>
              {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return (
                  <label>
                    <input
                      type="radio"
                      name="rating" 
                      required
                      value={currentRating}
                      onClick={()=>setRating(currentRating)}
                    />
                    <FaStar
                      className="star" size={30}
                      color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                      onMouseEnter={() => setHover(currentRating)}
                      onMouseLeave={() => setHover(null)}
                    />
                  </label>
                );
              })}
              <p>Your rating is {rating}</p>
            </div>
            <label>
              Title
              <input
                type="text"
                name="title" //name cовпадает с полем в state.name!!
                //   title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                className="input_field"
                value={newReview.title}
                onChange={(event) => {
                  setNewReview({
                    ...newReview,
                    title: event.target.value,
                  });
                }}
              />
            </label>
            <label>
              Description
              <input
                type="text"
                value={newReview.description}
                className="input-field"
                name="description"
                required
                onChange={(event) => {
                  setNewReview({
                    ...newReview,
                    description: event.target.value,
                  });
                }}
              />
            </label>

            {/* <label>
                <span className="guest">Guests number</span>
                <input
                  type="number"
                  value={newReservation.number_of_guests}
                  className="input-field"
                  name="guest"
                  required
                  onChange={(event) => {
                    setNewReservation({
                      ...newReservation,
                      number_of_guests: Number(event.target.value),
                    });
                  }}
                />
              </label> */}
            <button type="submit" className="form_btn">
              Send
            </button>
          </form>
        </div>
      </>
    );
}
// created_date: "2024-01-31T23:00:00.000Z";
// description: "The quality of material, taste and freshness was excellent";
// id: 1;
// meal_id: 1;
// stars: 10;
// title: "meal quality";