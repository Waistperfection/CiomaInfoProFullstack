import { Container, Stack, Badge, Button } from "react-bootstrap";

function FilterStack({ filters, serFilters }) {
  const removeFilter = (filter) => {
    serFilters(filters.filter((f) => f !== filter));
  };
  const renderFilter = (filter) => {
    const [colName, type, _, value] = filter;
    return `${colName} - ${type} - "${value}"`;
  }
  return (
    <Container className="mt-3">
      <div className="row">
        <Stack>
          {filters.map((filter) => (
            <Badge pill className={"p-2 m-1"} onClick={() => removeFilter(filter)}>
              {renderFilter(filter)}
            </Badge>
          ))}
        </Stack>
      </div>
      <div className="row">
        <div className="col d-flex justify-content-center">
        <Button variant="danger" onClick={() => serFilters([])} className={""}>
          clear filters
        </Button>
        </div>
      </div>
    </Container>
  );
}
export default FilterStack;
