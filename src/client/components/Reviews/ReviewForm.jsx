import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import toast from "cogo-toast-react-17-fix";

export default function ReviewForm() {
    const { id } = useParams();

    const [newReview, setRNewReview] = useState({
      created_date: "",
      description: "",
      id: "",
      meal_id: "",
      stars: "",
      title:"",
    });

    return (
        <>
            <h3>Have you tried? Leave your review!</h3>
        </>
    )
}
// created_date: "2024-01-31T23:00:00.000Z";
// description: "The quality of material, taste and freshness was excellent";
// id: 1;
// meal_id: 1;
// stars: 10;
// title: "meal quality";