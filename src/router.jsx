import { Route, Routes, Navigate } from "react-router-dom";
import { MoviesProvider } from "./contexts/MoviesContext";
import Layout from "./components/layout";
import Home from "./pages/home";
import Search from "./pages/search";

function Router() {
  return (
    <MoviesProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="home" element={<Home />} />
          <Route path="search" element={<Search />} />
        </Route>
      </Routes>
    </MoviesProvider>
  );
}

export default Router;
