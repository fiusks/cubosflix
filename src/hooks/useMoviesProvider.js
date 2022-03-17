import { useState } from "react";
function useMoviesProvider() {
  const [theme, setTheme] = useState("light");
  const [search, setSearch] = useState("");
  const [searchSubmit, setSearchSubmit] = useState(false);

  return {
    theme,
    setTheme,
    search,
    setSearch,
    searchSubmit,
    setSearchSubmit,
  };
}

export default useMoviesProvider;
