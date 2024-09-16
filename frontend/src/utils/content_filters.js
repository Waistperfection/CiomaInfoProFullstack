const gteFilter = (index, column, value) => {
  const parsedValue = parseFloat(value);
  function gte(row) {
    return parseFloat(row[index]) > parsedValue;
  }
  return gte;
};
const lteFilter = (index, column, value) => {
  const parsedValue = parseFloat(value);
  function lte(row) {
    return parseFloat(row[index]) < parsedValue;
  }
  return lte;
};

const containsFilter = (index, column, value) => {
  const parsedValue = ("" + value).toLowerCase();
  function cnt(row) {
    return ("" + row[index]).toLowerCase().includes(parsedValue);
  }
  return cnt;
};

const createFilter = (index, column, type, value) => {
  console.log(index, column, type, value);
  switch (type) {
    case "gte":
      return gteFilter(index, column, value);
    case "lte":
      return lteFilter(index, column, value);
    case "contains":
      return containsFilter(index, column, value);
    default:
      return null;
  }
};

export {createFilter};
