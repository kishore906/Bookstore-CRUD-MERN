import { Modal, Button } from "react-bootstrap";

function ShowModal({ bookInfo, handleClose, showModal }) {
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{bookInfo.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <i style={{ fontWeight: "600" }}>Written By: </i>
          {bookInfo.author}
        </p>
        <p>
          <i style={{ fontWeight: "600" }}>Published Year: </i>
          {bookInfo.publishYear}
        </p>
        <p>
          <i style={{ fontWeight: "600" }}>Created On: </i>
          {new Date(bookInfo.createdAt).toLocaleString()}
        </p>
        <p>
          <i style={{ fontWeight: "600" }}>Updated On: </i>
          {new Date(bookInfo.updatedAt).toLocaleString()}
        </p>

        <h6>About Book:</h6>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit sed
          aperiam, vitae id, voluptatem in dolor inventore optio veniam debitis
          libero! Nemo fuga exercitationem autem? Expedita esse et sapiente
          vitae!
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ShowModal;
