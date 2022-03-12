import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const Search = (props) => {
  const { listToFilter, filters, listSetter, placeHolder } = props;
  const [searchText, setSearchText] = useState("");

  let normalize = (value) => {
    return String(value)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const handleChange = (e) => {
    const st = normalize(e.target.value);
    if (st !== "") {
      filterData(st);
    } else {
      listSetter(listToFilter);
    }
  };

  const filterData = (searchText) => {
    const filteredList = listToFilter.filter((item) => {
      for (const filter of filters) {
        const splittedFilter = filter.split(".");
        let property = item[splittedFilter[0]];
        if (splittedFilter.length > 1) {
          property = property[splittedFilter[1]];
        }
        if (normalize(property).includes(searchText)) {
          return true;
        }
      }
    });
    listSetter(filteredList);
  };

  return (
    <>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<FaSearch color="#304580" />}
        />
        <Input
          onChange={handleChange}
          border="2px solid #304580"
          placeholder={placeHolder}
          mr="1rem"
        ></Input>
      </InputGroup>
    </>
  );
};

export default Search;
