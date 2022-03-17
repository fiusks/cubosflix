import "./style.scss";
import { Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import starRating from "../../assets/images/starRating.svg";
import MovieModal from "../modal-movie";

function CardMovie({ movie }) {
  const [modalShow, setModalShow] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState("");

  async function getMoviesData() {
    try {
      const response = await fetch(
        `https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${movie.id}?language=pt-BR`
      );
      const data = await response.json();
      setSelectedMovie(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getMoviesData();
  }, []);

  function handleOnClick() {
    setModalShow(true);
  }
  return (
    <>
      <Card
        className="movie-card-container"
        key={`card ${movie.id}`}
        onClick={() => handleOnClick()}
      >
        <Card.Img variant="top" src={movie.poster_path} className="img-fluid" />
        <Card.Body className="movie-card-body">
          <Card.Title>{movie.title}</Card.Title>
          <div className="movie-card-rating">
            <img src={starRating} alt="star icon" />
            <span>{movie.vote_average}</span>
          </div>
        </Card.Body>
      </Card>
      {modalShow && (
        <MovieModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          movie={selectedMovie}
        />
      )}
    </>
  );
}
export default CardMovie;
