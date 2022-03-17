import "./style.scss";
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Spinner,
} from "react-bootstrap";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import NavBar from "../navbar";
import useMovies from "../../hooks/useMovies";

function Layout() {
  const { theme, search, setSearch, searchSubmit, setSearchSubmit } =
    useMovies();
  const navigate = useNavigate();
  const location = useLocation();

  function handleSubmit(event) {
    event.preventDefault();
    setSearchSubmit(!searchSubmit);
    if (location.pathname === "/search") {
      return;
    }
    navigate("/search");
  }
  return (
    <Container fluid className={`main-container p-0 ${theme}`}>
      <NavBar />
      <Container>
        <Form className="search-bar" onSubmit={(event) => handleSubmit(event)}>
          <FormControl
            type="search"
            placeholder="Pesquisar..."
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Form>
        <Outlet />
      </Container>
    </Container>
  );
}
export default Layout;
