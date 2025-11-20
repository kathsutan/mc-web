import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Home.css";

const Home = () => {
  const API_KEY = "b86cde97be4789b76035e25dde0dcd50";
  const BASE_URL = "https://api.themoviedb.org/3";

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=1`);
        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  },[]);

  return (
    <div className="home">
      <h2>Popular Movies</h2>
      <div className="product-list">
        {movies.length === 0 ? (
          <p>Loading...</p>
        ) : (
          movies.map((movie) => <ProductCard key={movie.id} movie={movie} />)
        )}
      </div>
    </div>
  );
};

export default Home;
