import "./style.scss";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import useMovies from "../../hooks/useMovies";

function HighlightMovie() {
  const [movieHighlight, setMovieHighlight] = useState({});
  const [movieTrailer, setMovieTrailer] = useState("");
  const { theme } = useMovies();

  async function getHighlightMovie() {
    try {
      const response = await fetch(
        "https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false&sort_by=popularity.desc"
      );

      const { results } = await response.json();
      const highlightedMovie = results[0];
      const responseGenre = await fetch(
        `https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${highlightedMovie.id}?language=pt-BR`
      );
      const { genres } = await responseGenre.json();
      const movieData = { ...highlightedMovie, genres };

      setMovieHighlight(movieData);
    } catch (error) {
      console.log(error.message);
    }
  }
  async function getHighlightTrailer() {
    try {
      if (!movieHighlight?.id) {
        return;
      }
      const response = await fetch(
        `https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${movieHighlight.id}/videos?language=pt-BR`
      );
      const { results } = await response.json();
      if (!results) {
        return;
      }
      const officialTrailers = results.filter(
        (result) => result.official === true
      );
      setMovieTrailer(
        `https://www.youtube.com/embed/${officialTrailers[0].key}`
      );
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    getHighlightMovie();
  }, []);
  useEffect(() => {
    getHighlightTrailer();
  }, [movieHighlight]);
  return (
    <Row className="highlight-container">
      <Col>
        {movieTrailer && (
          <>
            <Row>
              <Col className="highlight-title">
                <h1>Highlight do Dia</h1>
              </Col>
            </Row>
            <Row>
              <Col lg={7}>
                <iframe src={movieTrailer ? movieTrailer : ""}></iframe>
              </Col>
              <Col
                lg={5}
                className={`${
                  theme === "light" ? "" : "darkMode"
                } highlight-info-container`}
              >
                <Row className="highlight-info-head">
                  <Col md={10}>
                    <h2 className="highlight-info-title">
                      {movieHighlight.title}
                    </h2>
                  </Col>
                  <Col md={2}>
                    <h2 className="highlight-info-vote">
                      {movieHighlight.vote_average}
                    </h2>
                  </Col>
                </Row>
                <Row>
                  <Col className="highlight-genres">
                    {movieHighlight.genres.map((genre) => {
                      return <span key={genre.id}>{genre.name}</span>;
                    })}
                  </Col>
                </Row>
                <span className="highlight-release-date">
                  {`Data de Lançamento: 
                      ${new Date(
                        movieHighlight.release_date
                      ).toLocaleDateString("pt-BR")}`}
                </span>
                <Row className="overview-container">
                  <Col>
                    <h3>{movieHighlight.overview}</h3>
                  </Col>
                </Row>
              </Col>
            </Row>
          </>
        )}
      </Col>
    </Row>
  );
}

export default HighlightMovie;
