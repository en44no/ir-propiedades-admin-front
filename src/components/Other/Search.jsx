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
    console.log(e.target.value)
    const st = normalize(e.target.value)
    if (st !== '') {
      filterData(st);
    } else {
      listSetter(listToFilter)
    }
  }


  const filterData = (searchText) => {
    let filteredList = []
    for (const item of listToFilter) {
      let matches = []

      for (const filter of filters) {
        matches.push(normalize(item[filter]).includes(searchText));
      }

      if (matches.includes(true)) {
        filteredList.push(item);
      }
    }
    console.log(filteredList)
    listSetter(filteredList);
  }

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
