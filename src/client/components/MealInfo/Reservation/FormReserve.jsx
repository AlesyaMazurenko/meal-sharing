import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import toast from "cogo-toast-react-17-fix";
import './reserv.css';

function FormReserv() {
  const { id } = useParams();

  const [newReservation, setNewReservation] = useState({
    contact_name: "",
    contact_email: "",
    contact_phonenumber: "",
    number_of_guests: "",
    meal_id: "",
    created_date: "",
  });

  const addReservation = (evt) => {
    evt.preventDefault();
    const meal_id = id;
    const created_date = new Date().toISOString().split("T")[0];
   
    const formData = JSON.stringify({
      ...newReservation,
      id: Number(meal_id + parseInt(created_date) + Math.random(100000)),
      meal_id: Number(meal_id),
      created_date: created_date,
    });

    fetch("http://localhost:5001/api/reservations", {
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
        console.log("Reservation successful:", data);
        setNewReservation({
          contact_name: "",
          contact_email: "",
          contact_phonenumber: "",
          number_of_guests: "",
          meal_id: "",
        });

          toast.success("Thanks for your reservation!", {
            position: "bottom-center",
            heading: "Success!",
            hideAfter: 5, // hides the toast after 5 seconds
          });
        
      })
      .catch((error) => {
        toast.error("Error submitting reservation", {
          position: "bottom-center",
          heading: "Error",
          hideAfter: 5,
        });
      }); 
  };
      
    return (
      <>
        <div className="reserv-block">
          <h2>Order now</h2>
          <form className="reservation-form" onSubmit={addReservation}>
            <label>
              Name
              <input
                type="text"
                name="contact_name" //name cовпадает с полем в state.name!!
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                className="input_field"
                value={newReservation.contact_name}
                onChange={(event) => {
                  setNewReservation({
                    ...newReservation,
                    contact_name: event.target.value.toLowerCase(),
                  });
                }}
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={newReservation.contact_email}
                className="input-field"
                name="email"
                required
                onChange={(event) => {
                  setNewReservation({
                    ...newReservation,
                    contact_email: event.target.value.toLowerCase(),
                  });
                }}
              />
            </label>
            <label>
              <span>Phone</span>
              <input
                type="tel"
                value={newReservation.contact_phonenumber}
                className="input-field"
                name="tel"
                required
                onChange={(event) => {
                  setNewReservation({
                    ...newReservation,
                    contact_phonenumber: event.target.value.toLowerCase(),
                  });
                }}
              />
            </label>

            <label>
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
            </label>
            <button type="submit" className="form_btn">
              Reserve
            </button>
          </form>
        </div>
      </>
    );
}

export default FormReserv;

