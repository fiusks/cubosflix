import { useContext } from "react";
import MoviesContext from "../contexts/MoviesContext";

function useMovies() {
  return useContext(MoviesContext);
}

export default useMovies;
