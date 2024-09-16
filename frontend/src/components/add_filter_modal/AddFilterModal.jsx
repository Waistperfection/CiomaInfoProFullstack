import { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";

function AddFilterModal({ show, column, closeModal, addFilter }) {
  const {index, columnName} = column;
  const [newFilterType, setNewFilterType] = useState("");
  const [newFilterValue, setNewFilterValue] = useState("");
  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add new filter to column "{columnName}"</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={e=> e.preventDefault()}>
            <Form.Group>
              <Form.Label>Choose a filter type</Form.Label>
              <Form.Select
                onChange={(e) => setNewFilterType(e.target.value)}
                defaultValue={"gte"}
                autoFocus={true}
              >
                <option value={"gte"}>greater then equal (numbers only)</option>
                <option value={"lte"}>lower then equal (numbers only)</option>
                <option value={"contains"}>text contains (text only)</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Enter filter value</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setNewFilterValue(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              closeModal();
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              closeModal();
              addFilter(index, columnName, newFilterType, newFilterValue);
            }}
          >
            AddFilter
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default AddFilterModal;
