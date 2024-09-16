import { useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  Container,
  Form,
  Button,
  Table,
  Modal,
  Badge,
  Stack,
} from "react-bootstrap/";
import FilterStack from "./components/filter_stack/FilterStack";
import AddFileForm from "./components/add_file_form/AddFileForm";
import ContentTable from "./components/add_filter_modal/content_table/ContentTable";

const checkRow = (row, filters) => {
  for (let i = 0; i < filters.length; i++) {
    const filter = filters[i][2];
    if (!filter(row)) {
      return false;
    }
  }
  return true;
};

function App() {
  const [data, setData] = useState({});
  const [filters, setFilters] = useState([]);
  const updateFilters = (filter) => {
    setFilters([...filters, filter]);
  };

  const updateData = (data) => {
    setData(data);
    setFilters([]);
  };

  const filteredData = useMemo(() => {
    return data?.data?.filter((row) => checkRow(row, filters));
  }, [data, filters]);
  return (
    <>
      <Container className="root-container rounded-3 py-3 mt-0 ">
        <h1 className="text-center mt-3">{"Explore your data"}</h1>
        <AddFileForm setData={updateData} />
        <FilterStack filters={filters} serFilters={setFilters} />
        {filteredData && (
          <ContentTable
            columns={data.columns}
            data={filteredData}
            updateFilters={updateFilters}
          />
        )}
      </Container>
    </>
  );
}

export default App;
