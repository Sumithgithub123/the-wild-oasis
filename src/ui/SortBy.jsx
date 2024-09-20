/* eslint-disable react/prop-types */
import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [search, setsearch] = useSearchParams();
  const currvalue = search.get("sortBy") || options[0].value;

  function handlechange(e) {
    search.set("sortBy", e.target.value);
    setsearch(search);
  }

  return (
    <Select
      onchange={handlechange}
      options={options}
      currvalue={currvalue}
      type={"white"}
    />
  );
}

export default SortBy;
