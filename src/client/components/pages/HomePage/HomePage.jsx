import React, { useEffect, useState } from "react";
import "./Home.css";
import Header from "../../Header/Header.jsx";
import { AppBar } from "../../Appbar/Appbar.jsx";
// import { fetchPopularMovie } from "api/Api";
// import MoviesItem from "components/MoviesItem/MoviesItem";

export default function HomePage() {
  // const [trending, setTrending] = useState();

  // useEffect(() => {
  //   async function getTrendingMovies() {
  //     try {
  //       const data = await fetchPopularMovie();
  //       setTrending(data.results);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getTrendingMovies();
  // }, []);

  return (
    <main>
     
      <AppBar />
      <Header />
   
    </main>
  );
}
