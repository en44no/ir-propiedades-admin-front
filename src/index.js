import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import theme from "./theme";
import AuthState from "./context/AuthState";
import PropertiesState from "./context/PropertiesState";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <PropertiesState>
        <AuthState>
          <App />
        </AuthState>
      </PropertiesState>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
