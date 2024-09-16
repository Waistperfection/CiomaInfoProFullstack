import { useState } from "react";
import { Container, Table } from "react-bootstrap";
import AddFilterModal from "../add_filter_modal/AddFilterModal";

import { createFilter } from "../../utils/content_filters";

function ContentTable({ columns, data: filteredData, updateFilters}) {
  const [showModal, setShowModal] = useState(false);
  const [column, setColumn] = useState({});
  const addFilter = (index, column, type, value) => {
    const filter = createFilter(index, column, type, value);
    updateFilters([column, type, filter, value]);
  };

  const openModal = (index, columnName) => {
    setColumn({ index, columnName });
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setColumn({});
  };
  return (
    <>
      <Container className="overflow-auto mt-3 px-0">
        <Table striped bordered>
          <thead className="bg-light" style={{ fontSize: "16px" }}>
            <tr>
              {columns.map((column, indx) => (
                <th
                  className="text-center"
                  key={indx}
                  onClick={() => {
                    openModal(indx, column);
                  }}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          {filteredData.map((row) => (
            <tbody>
              <tr className="text-center">
                {row.map((cell) => (
                  <td>{cell}</td>
                ))}
              </tr>
            </tbody>
          ))}
        </Table>
      </Container>
      <AddFilterModal
        show={showModal}
        column={column}
        closeModal={closeModal}
        addFilter={addFilter}
      />
    </>
  );
}
export default ContentTable;
