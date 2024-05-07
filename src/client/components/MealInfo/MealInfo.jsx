import React, { useState } from "react";
import { useParams, Outlet } from "react-router";
import { AppBar } from "../Appbar/Appbar";
import { NavLink,Link } from "react-router-dom";
import useSWR from 'swr';
import './MealInfo.css'

const fetcher = (url) => {
  return fetch(url).then((res) => res.json());
};

function MealInfo() {

     const [newReservation, setNewReservation] = useState({
       contact_name: "",
       contact_email: "",
       contact_phonenumber: "",
       number_of_guests: "",
       meal_id: "",
       created_date: "",
     });

     const [showModal, setShowModal] = useState(false);

    const { id } = useParams();
    
    const { data, error, isLoading } = useSWR(
        `http://localhost:5001/api/meals/${id}`,
        fetcher
      );
      if (isLoading) return <div>Loading...</div>;
      if (error) return <div>Error in fetching data</div>;
    console.log("data", data[0]);
    
     const getActiveClass = ({ isActive }) => {
       return isActive ? `meal-link active` : `meal-link`;
     };
    
    return (
      <>
        <AppBar />
        <main>
          {error && <p>Sorry, burger is not found</p>}
          {data && (
            <div className="meal-wrapper">
               <img
                className="meal-poster"
                src={data[0].img}
                alt={data[0].title}
              /> 
              <div className="meal-description">
                <h3>{data[0].title}</h3>
                <p>{data[0].description}</p>
                <p>
                  Created date:{" "}
                  <span className="meal-description_span">
                    {data[0].created_date}
                  </span>
                </p>
                <p>
                  Location:{" "}
                  <span className="meal-description_span">
                    {data[0].location}
                  </span>
                </p>
                <p>
                  Price:{" "}
                  <span className="meal-description_span">{data[0].price}</span>
                </p>
                <p>
                  Available reservations:{" "}
                  <span className="meal-description_span">
                    {data[0].max_reservations}
                  </span>
                </p>
              </div>
            </div>
          )}

          <div>
            <NavLink className={getActiveClass} to="cast">
              Cast
            </NavLink>
            <NavLink className={getActiveClass} to="reviews">
              Reviews
            </NavLink>
            <Link to="/" className="film-link">
              Go Back
            </Link>
          </div>
        </main>
      </>
    );
}

export default MealInfo;