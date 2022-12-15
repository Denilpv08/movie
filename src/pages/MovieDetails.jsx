import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import get from "../data/httpClient";
import getMovieImg from "../utils/getMovieImg";
import './MovieDetails.css';

function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState([]);
  const [generos, setGeneros] = useState([]);
  useEffect(() => {
    get("/movie/" + movieId).then((data) => {
      setMovie(data);  
      setGeneros(data.genres[0]);    
    });
  }, [movieId]);

  const imageUrl = getMovieImg(movie.poster_path, 500);

  return (
    <div className="detailsContainer">
      <img src={imageUrl} alt={movie.title} className="col movieImage"/>
      <div className="col movieDetails">
        <p className="title">
          <strong>{ movie.title }</strong>
        </p>
        <p>
          <strong>Género: </strong>
          {generos.name}
        </p>
        <p>
          <strong>Descripción: </strong>
          {movie.overview}
        </p>
      </div>
    </div>
  );
}

export default MovieDetails;