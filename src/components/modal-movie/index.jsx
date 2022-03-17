import "./style.scss";
import { Modal, Row, Col } from "react-bootstrap";

function MovieModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="movie-modal"
    >
      <Modal.Header closeButton className="">
        <Modal.Title id="contained-modal-title-vcenter">
          {props.movie.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={props.movie.poster_path} alt={`${props.movie.title} cover`} />
        <p>{props.movie.overview}</p>
      </Modal.Body>
      <Modal.Footer as={Row}>
        <Col className="movie-categories">
          {props.movie.genres.map((genre) => (
            <span key={genre.id}>{genre.name}</span>
          ))}
        </Col>
      </Modal.Footer>
    </Modal>
  );
}

export default MovieModal;
