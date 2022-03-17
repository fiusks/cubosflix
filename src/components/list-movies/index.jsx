import "./style.scss";
import CardMovie from "../card-movie";
import { useState, useEffect } from "react";
import { Row, Col, Carousel } from "react-bootstrap";
import useMovies from "../../hooks/useMovies";
import useCurrentWidth from "../../hooks/useCurrentWidth";

function ListMovies({ listGenre, movieGenreId }) {
  const { theme } = useMovies();
  const [movieList, setMovielist] = useState([]);

  async function getMoviesList() {
    try {
      const response = await fetch(
        "https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false"
      );
      const { results } = await response.json();
      setMovielist([...results]);
    } catch (error) {
      console.log(error.message);
    }
  }
  async function getMoviesListByGenre() {
    try {
      const response = await fetch(
        `https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false&with_genres=${movieGenreId}`
      );
      const { results } = await response.json();
      setMovielist([...results]);
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    movieGenreId ? getMoviesListByGenre() : getMoviesList();
  }, []);

  function cardWrapper(initialCard, endCard, index) {
    return (
      <Carousel.Item key={index}>
        <div className="card-wrapper">
          {movieList.slice(initialCard, endCard).map((movie) => {
            return (
              <Col key={movie.id}>
                <CardMovie movie={movie} />
              </Col>
            );
          })}
        </div>
      </Carousel.Item>
    );
  }
  const width = useCurrentWidth();
  function cardsRender(width) {
    let pagination = 5;
    if (width < 768) {
      pagination = 2;
    }
    if (width >= 768 && width < 992) {
      pagination = 4;
    }

    const carouselItemsAmount = 20 / pagination;
    const carouselItem = new Array(carouselItemsAmount);
    for (let i = 0; i < carouselItemsAmount; i++) {
      if (i === 0) {
        carouselItem[i] = cardWrapper(i, i + pagination, `item${i}`);
      } else {
        carouselItem[i] = cardWrapper(
          i * pagination,
          (i + 1) * pagination,
          `item${i}`
        );
      }
    }

    return carouselItem;
  }

  const newMovielist = cardsRender(width);
  return (
    <Row>
      <Col>
        <Row>
          <Col className="list-genre">
            <h1>{listGenre}</h1>
          </Col>
        </Row>

        <Row>
          <Carousel
            variant={theme === "light" ? "dark" : "light"}
            indicators={false}
            interval={null}
          >
            {newMovielist.map((item) => item)}
          </Carousel>
        </Row>
      </Col>
    </Row>
  );
}

export default ListMovies;
