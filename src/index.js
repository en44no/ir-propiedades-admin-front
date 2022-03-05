import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import theme from "./theme";
import PropertiesState from "./context/Properties/PropertiesState";
import AuthState from "./context/Auth/AuthState";
import UsersState from "./context/Users/UsersState";
import CustomersState from "./context/Customers/CustomersState";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <PropertiesState>
        <AuthState>
          <UsersState>
            <CustomersState>
              <App />
            </CustomersState>
          </UsersState>
        </AuthState>
      </PropertiesState>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
