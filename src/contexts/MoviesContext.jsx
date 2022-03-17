//arquivo criado para testar o context
import { createContext } from "react";
import useMoviesProvider from "../hooks/useMoviesProvider";

const MoviesContext = createContext({});

export function MoviesProvider(props) {
  const moviesProvider = useMoviesProvider();
  return (
    <MoviesContext.Provider value={moviesProvider}>
      {props.children}
    </MoviesContext.Provider>
  );
}

export default MoviesContext;
