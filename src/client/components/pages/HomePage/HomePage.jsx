import React, { useEffect, useState } from "react";
import "./Home.css";
// import { fetchPopularMovie } from "api/Api";
// import MoviesItem from "components/MoviesItem/MoviesItem";

export default function HomePage() {
  const [trending, setTrending] = useState();

  useEffect(() => {
    async function getTrendingMovies() {
      try {
        const data = await fetchPopularMovie();
        setTrending(data.results);
      } catch (error) {
        console.log(error);
      }
    }
    getTrendingMovies();
  }, []);

  return (
    <main>
      <h1>Home Page</h1>
      <h2>Trending films today</h2>
      <ul className="meals-list">
        {trending && <MoviesItem data={trending} />}
      </ul>
    </main>
  );
}
