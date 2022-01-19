import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import Header from "./Header";
import Content from "./Content";
import SideBar from "../../layouts/SideBar/SideBar";

const GridSection = (props) => {
  const { children, title } = props;
  return (
    <>
      <Grid
        h="100vh"
        templateRows="repeat(16, 1fr)"
        templateColumns="repeat(13, 1fr)"
      >
        <GridItem rowSpan={16} colSpan={3}>
          <SideBar />
        </GridItem>
        <GridItem rowSpan={1} colSpan={10}>
          <Header title={title} />
        </GridItem>
        <GridItem rowSpan={15} colSpan={10}>
          <Content>{children}</Content>
        </GridItem>
      </Grid>
    </>
  );
};

export default GridSection;
