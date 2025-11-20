import { useEffect, useState, useContext } from "react";
import "./ProductDetail.css";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/CartContext";


const ProductDetail = () => {

  const API_KEY = "b86cde97be4789b76035e25dde0dcd50";
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => setMovie(data));
  }, [id]);

  const {addToCart} = useContext(CartContext)
  
  const handleAddToCart = () => {
    addToCart({
      id: movie.id,
      title: movie.title,
      price: movie.vote_average.toFixed(2),
      image: movie.poster_path ? IMAGE_BASE_URL + movie.poster_path: ''
    })
  }

  if (!movie) {
    return <p>Loading...</p>;
  }


  return (
    <div className="product-detail">
      <div className="product-detail__image">
        <img
          src={movie.poster_path ? IMAGE_BASE_URL + movie.poster_path : ""
          }
          alt={movie.title}
        />
      </div>
      <div className="product-detail__info">
        <h2>{movie.title}</h2>
        <p className="description">{movie.overview}</p>
        <p className="price">${movie?.vote_average?.toFixed(1)}</p>
        <button className="btn add-btn" onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetail;
