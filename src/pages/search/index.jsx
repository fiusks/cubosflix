import "./style.scss";
import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import CardMovie from "../../components/card-movie";

import useMovies from "../../hooks/useMovies";

function Search() {
  const { search, searchSubmit } = useMovies();
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    async function searchMovies() {
      const response = await fetch(
        `https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false&query=${search}`
      );
      const { results } = await response.json();

      setSearchResult(results);
    }
    if (search) {
      searchMovies();
    }
  }, [searchSubmit]);

  return (
    <Row>
      {searchResult.map((result) => {
        return (
          <Col className="search-results" key={`card-col ${result.id}`}>
            <CardMovie movie={result} />
          </Col>
        );
      })}
    </Row>
  );
}

export default Search;
