import "./style.scss";
import { Row, Col } from "react-bootstrap";
import HighlightMovie from "../../components/highlight-movie";
import ListMovies from "../../components/list-movies";
import useMovies from "../../hooks/useMovies";
import { useEffect } from "react";

function Home() {
  const { setSearch } = useMovies();
  useEffect(() => {
    setSearch("");
  }, []);
  return (
    <Row>
      <Col className="home-container">
        <HighlightMovie />
        <ListMovies listGenre="Ação" movieGenreId={28} />
        <ListMovies listGenre="Aventura" movieGenreId={12} />
        <ListMovies listGenre="Comédia" movieGenreId={35} />
      </Col>
    </Row>
  );
}

export default Home;
