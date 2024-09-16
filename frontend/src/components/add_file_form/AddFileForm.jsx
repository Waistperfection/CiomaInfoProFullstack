import { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";

function AddFileForm({ setData }) {
  const [loading, setLoading] = useState(false);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // const file = e.target.elements[0].files[0];
    setLoading(true);
    const file = e.target.formFile.files[0];
    formData.append("file", file);
    try {
      const response = await fetch("http://localhost/api/upload/", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setData({ ...data });
      } else {
        alert("Error: " + data.error);
      }
    } finally {
      setLoading(false);
    }
  };
  const onFormCancel = (e) => {
    e.preventDefault();
    setData({});
  };

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-6 px-3">
        <Form onSubmit={onFormSubmit} className="container">
          <Form.Group controlId={"formFile"} className="row">
            <Form.Label>
              {"To explore a file - add it to this field and click the button"}
            </Form.Label>
            <Form.Control type="file" />
            <Form.Text>можно доавить файл в формате .csv и .xlsx</Form.Text>
          </Form.Group>
          <Form.Group className="row gy-1 mt-2">
            <div className="col">
              <Button
                type="submit"
                variant="success"
                className="w-100"
                disabled={loading}
              >
                {loading && (
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                )}{" "}
                submit
              </Button>
            </div>
            <div className="col">
              <Button
                type="reset"
                variant="danger"
                onClick={() => setData({})}
                className="w-100"
              >
                cancell
              </Button>
            </div>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}
export default AddFileForm;
