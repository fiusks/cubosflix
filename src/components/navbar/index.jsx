import "./style.scss";
import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import useMovies from "../../hooks/useMovies";
import logo from "../../assets/images/logo.svg";
import lightMode from "../../assets/images/light-mode.svg";
import darkMode from "../../assets/images/dark-mode.svg";

function NavBar() {
  const { theme, setTheme, setSearch } = useMovies();
  return (
    <Row className="gx-0">
      <Col className="NavBar-container">
        <Navbar expand="lg" className="navbar-container">
          <div className="navbar-links">
            <Navbar.Brand as={NavLink} to="home" className="nav-brand">
              <img alt="" src={logo} />
              <h1>Cubos Flix</h1>
            </Navbar.Brand>
            <Nav>
              <Nav.Link as={NavLink} to="home">
                Home
              </Nav.Link>
            </Nav>
          </div>
          <Nav>
            <img
              src={theme === "light" ? lightMode : darkMode}
              alt="light mode icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            />
          </Nav>
        </Navbar>
      </Col>
    </Row>
  );
}

export default NavBar;
